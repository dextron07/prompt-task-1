import { Button, Card, List, message, PageHeader, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getEssays, selectOrderedFeedbackRequests } from 'store/feedback/feedbackSelector'
import { loadFeedbackRequests, getFeedbacks } from 'store/feedback/feedbackThunks'
import { FeedbackRequest } from 'store/feedback/feedbackTypes'
import { useReduxDispatch } from 'store/store'

export const EssayList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useReduxDispatch()
  const feedbackRequests = useSelector(selectOrderedFeedbackRequests)
  const essays = useSelector(getEssays)
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        await dispatch(loadFeedbackRequests())
        await dispatch(getFeedbacks())
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        message.error('Failed to load essays. Please refresh this page to try again.')
      }
    })()
  }, [dispatch])

  const handleAddFeedback = id => {
    history.push(`/feedback/add/${id}/`)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card className="center">
          <Spin />
        </Card>
      )
    }
    return (
      <List
        itemLayout="horizontal"
        dataSource={feedbackRequests}
        renderItem={(item: FeedbackRequest) => {
          let essay = essays[item.essay]
          let description = (
            <Button type="primary" onClick={() => handleAddFeedback(item.pk)}>
              Add Feedback
            </Button>
          )

          if (item.edited || item.is_editing_active) {
            return
          }
          return (
            <List.Item>
              <List.Item.Meta title={essay.name} description={description} />
            </List.Item>
          )
        }}
      />
    )
  }

  return (
    <>
      <PageHeader ghost={false} title="Feedback Requests" />
      <Card>{renderContent()}</Card>
    </>
  )
}
