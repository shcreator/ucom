'use client'

import { Typography, Input, Card, Row, Col, Space } from 'antd'
import { SearchOutlined, StarOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')

  const { data: categories } = Api.category.findMany.useQuery({})
  const { data: templates } = Api.template.findMany.useQuery({
    include: { category: true },
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { category: { name: { contains: searchTerm, mode: 'insensitive' } } },
      ],
    },
  })

  const { data: featuredTemplates } = Api.template.findMany.useQuery({
    where: { featured: true },
    take: 3,
  })

  const handleTemplateClick = (templateId: string) => {
    router.push(`/templates/${templateId}`)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={1}>Template Marketplace</Title>
        <Text>Browse and find templates that suit your needs</Text>

        <Input
          placeholder="Search templates by name or category"
          prefix={<SearchOutlined />}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: '100%' }}
        />

        {featuredTemplates && featuredTemplates.length > 0 && (
          <>
            <Title level={2}>Featured Templates</Title>
            <Row gutter={[16, 16]}>
              {featuredTemplates.map(template => (
                <Col xs={24} sm={12} md={8} key={template.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={template.name || 'Template'}
                        src={
                          template.screenshotsUrl ||
                          'https://via.placeholder.com/300'
                        }
                      />
                    }
                    onClick={() => handleTemplateClick(template.id)}
                  >
                    <Card.Meta
                      title={template.name}
                      description={
                        <>
                          <Text>{template.description}</Text>
                          <br />
                          <Text strong>
                            {template.isPremium ? 'Premium' : 'Free'}
                          </Text>
                          <br />
                          <StarOutlined style={{ color: 'gold' }} /> Featured
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        <Title level={2}>All Templates</Title>
        {categories?.map(category => (
          <div key={category.id}>
            <Title level={3}>{category.name}</Title>
            <Row gutter={[16, 16]}>
              {templates
                ?.filter(template => template.categoryId === category.id)
                .map(template => (
                  <Col xs={24} sm={12} md={8} key={template.id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={template.name || 'Template'}
                          src={
                            template.screenshotsUrl ||
                            'https://via.placeholder.com/300'
                          }
                        />
                      }
                      onClick={() => handleTemplateClick(template.id)}
                    >
                      <Card.Meta
                        title={template.name}
                        description={
                          <>
                            <Text>{template.description}</Text>
                            <br />
                            <Text strong>
                              {template.isPremium ? 'Premium' : 'Free'}
                            </Text>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))}
      </Space>
    </PageLayout>
  )
}
