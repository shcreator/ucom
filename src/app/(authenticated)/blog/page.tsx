'use client'

import { Typography, Card, Row, Col, Tag, Input, Space } from 'antd'
import { BookOutlined, TagOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BlogPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: blogPosts, isLoading } = Api.blogPost.findMany.useQuery({
    include: { author: true },
    orderBy: { dateCreated: 'desc' },
  })

  const { data: categories } = Api.category.findMany.useQuery()

  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handlePostClick = (postId: string) => {
    router.push(`/blog/${postId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Blog</Title>
      <Paragraph>
        Read our latest blog posts about templates, design tips, and related
        content to gain insights and stay informed.
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Input
          placeholder="Search blog posts"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div>
          <Text strong>Categories: </Text>
          <Space wrap>
            {categories?.map(category => (
              <Tag
                key={category.id}
                color={selectedCategory === category.id ? 'blue' : 'default'}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id,
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                {category.name}
              </Tag>
            ))}
          </Space>
        </div>

        {isLoading ? (
          <Text>Loading blog posts...</Text>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredPosts?.map(post => (
              <Col xs={24} sm={12} md={8} key={post.id}>
                <Card
                  hoverable
                  onClick={() => handlePostClick(post.id)}
                  cover={
                    <div
                      style={{
                        height: 200,
                        background: '#f0f2f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BookOutlined
                        style={{ fontSize: 48, color: '#1890ff' }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={post.title}
                    description={
                      <>
                        <Paragraph ellipsis={{ rows: 2 }}>
                          {post.content}
                        </Paragraph>
                        <Space>
                          <Text type="secondary">
                            By {post.author?.name} on{' '}
                            {dayjs(post.dateCreated).format('MMMM D, YYYY')}
                          </Text>
                        </Space>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
