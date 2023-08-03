import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from 'next-auth'

interface UserAvatarProps {
    user: Pick<User, "name" | "image">
}

const UserAvatar = ({ user }: UserAvatarProps) => {
    return (
        <Avatar>
            {user.image ? (
                <AvatarImage src={user.image} />
            ) : (
                <AvatarFallback>
                    {user.name ? user.name.charAt(0) : ''}
                </AvatarFallback>
            )}
        </Avatar>
    )
}

export default UserAvatar
