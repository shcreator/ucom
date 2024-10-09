'use client'

import { Typography, Space, Spin, Button } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BlogPostPage() {
  const router = useRouter()
  const params = useParams<{ postId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: blogPost, isLoading } = Api.blogPost.findUnique.useQuery({
    where: { id: params.postId },
    include: { author: true },
  })

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost?.title || 'Blog Post',
          text: 'Check out this interesting blog post!',
          url: window.location.href,
        })
        enqueueSnackbar('Post shared successfully!', { variant: 'success' })
      } catch (error) {
        console.error('Error sharing:', error)
        enqueueSnackbar('Failed to share the post', { variant: 'error' })
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      enqueueSnackbar('Link copied to clipboard!', { variant: 'info' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!blogPost) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Blog Post Not Found</Title>
        <Paragraph>The requested blog post could not be found.</Paragraph>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={1}>{blogPost.title}</Title>
        <Space>
          <Paragraph type="secondary">
            By {blogPost.author?.name || 'Unknown Author'}
          </Paragraph>
          <Paragraph type="secondary">
            {dayjs(blogPost.dateCreated).format('MMMM D, YYYY')}
          </Paragraph>
        </Space>
        <Button icon={<ShareAltOutlined />} onClick={handleShare}>
          Share
        </Button>
        <div style={{ marginTop: '2rem' }}>
          <Paragraph>{blogPost.content || ''}</Paragraph>
        </div>
      </Space>
    </PageLayout>
  )
}
