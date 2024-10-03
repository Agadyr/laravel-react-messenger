<?php

namespace App\Http\Controllers;

use App\Events\SocketMessage;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\MessageAttachment;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Laravel\Reverb\Pulse\Livewire\Messages;
use Psy\Util\Str;

class MessageController extends Controller
{
    public function byUser(User $user)
    {
        $messages = Message::where('sender_id', auth()->id())
            ->where('receiver_id', $user->id)
            ->orWhere('sender_id', $user->id)
            ->where('receiver_id', auth()->id())
            ->latest()
            ->paginate(10);

        return inertia('Home', [
            'selectedConversation' => $user->toConversationArray(),
            'messages' => MessageResource::collection($messages)
        ]);

    }

    public function byGroup(Group $group)
    {
        $messages = Messages::where('group_id', $group->id)
            ->Latest()
            ->paginate(50);

        return inertia('Home', [
            'selectedConversation' => $group->toConversationArray(),
            'messages' => MessageResource::collection($messages)
        ]);
    }

    public function loadOrder(Message $message)
    {
        if($message->group_id){
            $messages = Messages::where('created_at', '<', $message->created_at)
                ->where('group_id', $message->group_id)
                ->latest()
                ->paginate();
        } else {
            $messages = Messages::where('created_at', '<', $message->created_at)
                ->where(function ($query) use ($message) {
                    $query->where('sender_id', $message->sender_id)
                        ->where('receiver_id', $message->receiver_id)
                        ->orWhere('receiver_id', $message->receiver_id)
                        ->Where('sender_id', $message->sender_id);
                })
                ->latest()
                ->paginate();
        }
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = auth()->id();
        $receiverId = $data['receiver_id'] ?? null;
        $groupId = $data['group_id'] ?? null;

        $files = $data['attachments'] ?? [];

        $message = Message::create($data);
        $attachments = [];

        if ($files) {
            foreach ($files as $file) {
                $directory = 'attachments/' . \Illuminate\Support\Str::random(32);
                Storage::makeDirectory($directory);

                $model = [
                    'message_id' => $message->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMymeType(),
                    'size' => $file->getSize(),
                    'path' => $file->store($directory, 'public')
                ];
                $attachment = MessageAttachment::create($model);
                $attachments[] = $attachment;
            }
            $message->attachments = $attachments;
        }

        if ($receiverId) {
            Conversation::updateConversationWithMessage($receiverId, auth()->id(), $message);
        }

        if ($groupId) {
            Conversation::updateGroupWithMessage($groupId, $message);
        }

        SocketMessage::dispatch($message);

        return new MessageResource($message);

    }

    public function destroy(Message $message)
    {

    }
}
