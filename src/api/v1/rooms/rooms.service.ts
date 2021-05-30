import { ObjectId } from 'mongoose';
import Room, { IRoom } from './rooms.model';

export async function createRoomService(title: string, description: string): Promise<IRoom> {
    const room = await new Room({
        title,
        description,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        createdBy: req.userId,
    }).save();
    return room;
}

export async function getRoomsService(): Promise<IRoom[]> {
    const rooms = await Room.find(
        {},
        {
            _id: 1,
            title: 1,
            description: 1,
        },
    );
    return rooms;
}

export async function getRoomService(roomId: string): Promise<IRoom | null> {
    const rooms = await Room.findById(roomId);
    return rooms;
}

export async function addMessageToRoomService(
    roomId: string,
    message: {
        sentBy: ObjectId;
        content: string;
        createdAt: number;
    },
): Promise<void> {
    await Room.findByIdAndUpdate(roomId, { $push: { messages: message } });
}
