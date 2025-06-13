'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import type { ArticleComment } from '../schema';

interface CommentWithReplies extends Omit<ArticleComment, 'orgId'> {
  orgId?: string | null;
  isLikedByUser?: boolean;
  replies?: CommentWithReplies[];
}

interface ArticleCommentsProps {
  articleSlug: string;
  className?: string;
}

interface CommentItemProps {
  comment: CommentWithReplies;
  onReply: (parentId: string) => void;
  onEdit: (comment: CommentWithReplies) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  currentUserId?: string;
  isReply?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onLike,
  currentUserId,
  isReply = false,
}) => {
  const isOwner = currentUserId === comment.userId;
  const initials = comment.userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'space-y-3',
        isReply && 'ml-8 border-l-2 border-gray-100 pl-4'
      )}
    >
      <Card className='w-full'>
        <CardHeader className='pb-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={comment.userImage || undefined} />
                <AvatarFallback className='text-xs'>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium'>{comment.userName}</p>
                <p className='text-muted-foreground text-xs'>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {comment.isEdited && (
                    <Badge variant='secondary' className='ml-2 text-xs'>
                      Edited
                    </Badge>
                  )}
                </p>
              </div>
            </div>

            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='sm'>
                    <MoreVertical className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onEdit(comment)}>
                    <Edit className='mr-2 h-4 w-4' />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(comment.id)}
                    className='text-destructive'
                  >
                    <Trash2 className='mr-2 h-4 w-4' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        <CardContent className='pt-0'>
          <p className='text-sm whitespace-pre-wrap'>{comment.content}</p>
        </CardContent>

        <CardFooter className='pt-0'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onLike(comment.id)}
              className={cn(
                'flex items-center space-x-1',
                comment.isLikedByUser && 'text-red-500'
              )}
            >
              <Heart
                className={cn(
                  'h-4 w-4',
                  comment.isLikedByUser && 'fill-current'
                )}
              />
              <span>{comment.likesCount}</span>
            </Button>

            {!isReply && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onReply(comment.id)}
                className='flex items-center space-x-1'
              >
                <MessageCircle className='h-4 w-4' />
                <span>Reply</span>
                {comment.repliesCount > 0 && (
                  <Badge variant='secondary' className='ml-1'>
                    {comment.repliesCount}
                  </Badge>
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className='space-y-3'>
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onLike={onLike}
              currentUserId={currentUserId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ArticleComments: React.FC<ArticleCommentsProps> = ({
  articleSlug,
  className,
}) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingComment, setEditingComment] =
    useState<CommentWithReplies | null>(null);
  const [editContent, setEditContent] = useState('');

  const trpc = useTRPC();

  // TRPC queries and mutations
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery(
    trpc.articles.getComments.queryOptions({
      articleSlug,
      limit: 50,
      sortBy: 'newest',
    })
  );

  const addCommentMutation = useMutation(
    trpc.articles.addComment.mutationOptions({
      onSuccess: () => {
        setNewComment('');
        setReplyingTo(null);
        setReplyContent('');
        refetch();
      },
    })
  );

  const updateCommentMutation = useMutation(
    trpc.articles.updateComment.mutationOptions({
      onSuccess: () => {
        setEditingComment(null);
        setEditContent('');
        refetch();
      },
    })
  );

  const deleteCommentMutation = useMutation(
    trpc.articles.deleteComment.mutationOptions({
      onSuccess: () => refetch(),
    })
  );

  const likeCommentMutation = useMutation(
    trpc.articles.likeComment.mutationOptions({
      onSuccess: () => refetch(),
    })
  );

  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;

    const userName =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username || user.emailAddresses[0]?.emailAddress || 'Anonymous';

    addCommentMutation.mutate({
      articleSlug,
      content: newComment.trim(),
      userName,
      userImage: user.imageUrl,
    });
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim() || !replyingTo || !user) return;

    const userName =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username || user.emailAddresses[0]?.emailAddress || 'Anonymous';

    addCommentMutation.mutate({
      articleSlug,
      content: replyContent.trim(),
      parentId: replyingTo,
      userName,
      userImage: user.imageUrl,
    });
  };

  const handleSubmitEdit = () => {
    if (!editContent.trim() || !editingComment) return;

    updateCommentMutation.mutate({
      commentId: editingComment.id,
      content: editContent.trim(),
    });
  };
  const handleDelete = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate({ commentId });
    }
  };

  const handleLike = (commentId: string) => {
    likeCommentMutation.mutate({ commentId });
  };

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
    setReplyContent('');
  };

  const handleEdit = (comment: CommentWithReplies) => {
    setEditingComment(comment);
    setEditContent(comment.content);
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className='animate-pulse space-y-4'>
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardHeader>
                <div className='flex items-center space-x-3'>
                  <div className='h-8 w-8 rounded-full bg-gray-200' />
                  <div className='space-y-1'>
                    <div className='h-4 w-24 rounded bg-gray-200' />
                    <div className='h-3 w-16 rounded bg-gray-200' />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='h-4 w-full rounded bg-gray-200' />
                  <div className='h-4 w-3/4 rounded bg-gray-200' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div>
        <h3 className='mb-4 text-lg font-semibold'>
          Comments ({comments.length})
        </h3>

        {/* Add new comment */}
        {user ? (
          <Card className='mb-6'>
            <CardContent className='pt-6'>
              <div className='flex space-x-3'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 space-y-3'>
                  <Textarea
                    placeholder='Share your thoughts about this article...'
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className='flex justify-end'>
                    <Button
                      onClick={handleSubmitComment}
                      disabled={
                        !newComment.trim() || addCommentMutation.isPending
                      }
                    >
                      {addCommentMutation.isPending
                        ? 'Posting...'
                        : 'Post Comment'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className='mb-6'>
            <CardContent className='pt-6 text-center'>
              <p className='text-muted-foreground'>
                Please sign in to leave a comment
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comments list */}
      <div className='space-y-4'>
        {comments.length === 0 ? (
          <Card>
            <CardContent className='pt-6 text-center'>
              <p className='text-muted-foreground'>
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment: CommentWithReplies) => (
            <div key={comment.id} className='space-y-4'>
              <CommentItem
                comment={comment}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
                currentUserId={user?.id}
              />

              {/* Reply form */}
              {replyingTo === comment.id && user && (
                <Card className='ml-8'>
                  <CardContent className='pt-6'>
                    <div className='flex space-x-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1 space-y-3'>
                        <Textarea
                          placeholder='Write a reply...'
                          value={replyContent}
                          onChange={e => setReplyContent(e.target.value)}
                          rows={2}
                        />
                        <div className='flex justify-end space-x-2'>
                          <Button
                            variant='outline'
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSubmitReply}
                            disabled={
                              !replyContent.trim() ||
                              addCommentMutation.isPending
                            }
                          >
                            {addCommentMutation.isPending
                              ? 'Posting...'
                              : 'Reply'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))
        )}
      </div>

      {/* Edit comment modal */}
      {editingComment && (
        <Card className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='mx-4 w-full max-w-md rounded-lg bg-white p-6'>
            <h3 className='mb-4 text-lg font-semibold'>Edit Comment</h3>
            <Textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              rows={4}
              className='mb-4'
            />
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setEditingComment(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitEdit}
                disabled={
                  !editContent.trim() || updateCommentMutation.isPending
                }
              >
                {updateCommentMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ArticleComments;
