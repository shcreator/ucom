'use client'

import { useState, useEffect } from 'react'
import {
  Input,
  Select,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Spin,
  Empty,
} from 'antd'
import { SearchOutlined, DollarOutlined, FireOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SearchResultsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchQuery, setSearchQuery] = useState(params.query || '')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  const { data: categories } = Api.category.findMany.useQuery({})
  const {
    data: templates,
    isLoading,
    refetch,
  } = Api.template.findMany.useQuery({
    where: {
      name: { contains: searchQuery, mode: 'insensitive' },
      ...(category && { categoryId: category }),
    },
    include: { category: true },
    orderBy: sortBy === 'price' ? { price: 'asc' } : { dateCreated: 'desc' },
  })

  useEffect(() => {
    refetch()
  }, [searchQuery, category, sortBy, refetch])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handleTemplateClick = (templateId: string) => {
    router.push(`/templates/${templateId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Search Results</Title>
        <Text>Find the perfect template for your needs</Text>

        <Space direction="horizontal" size="middle">
          <Input
            placeholder="Search templates"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Select
            style={{ width: 200 }}
            placeholder="Select category"
            onChange={handleCategoryChange}
            value={category}
          >
            <Option value="">All Categories</Option>
            {categories?.map(cat => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 150 }}
            placeholder="Sort by"
            onChange={handleSortChange}
            value={sortBy}
          >
            <Option value="popularity">Popularity</Option>
            <Option value="price">Price</Option>
          </Select>
        </Space>

        {isLoading ? (
          <Spin size="large" />
        ) : templates && templates.length > 0 ? (
          <Row gutter={[16, 16]}>
            {templates.map(template => (
              <Col xs={24} sm={12} md={8} lg={6} key={template.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={template.name}
                      src={
                        template.screenshotsUrl ||
                        'https://via.placeholder.com/300x200'
                      }
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  }
                  onClick={() => handleTemplateClick(template.id)}
                >
                  <Card.Meta
                    title={template.name}
                    description={
                      <Space direction="vertical">
                        <Text>{template.category?.name}</Text>
                        <Space>
                          <DollarOutlined />
                          <Text strong>${template.price?.toString()}</Text>
                        </Space>
                        {template.featured && (
                          <Space>
                            <FireOutlined style={{ color: 'orange' }} />
                            <Text type="secondary">Featured</Text>
                          </Space>
                        )}
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No templates found" />
        )}
      </Space>
    </PageLayout>
  )
}
