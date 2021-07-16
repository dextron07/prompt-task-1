import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

// Ant Designs Modules
import { Button, Card, Collapse, Input, List, message, PageHeader, Spin, Row, Col } from 'antd'

import {
  getEssays,
  getFeedbackRequests,
  selectOrderedFeedbackRequests,
  getFeedbacks as allFeedbacks,
} from 'store/feedback/feedbackSelector'
import { FeedbackRequest } from 'store/feedback/feedbackTypes'
import { loadFeedbackRequests, updateFeedbackRequest, addFeedback, getFeedbacks } from 'store/feedback/feedbackThunks'
import { useReduxDispatch } from 'store/store'

const AddFeedback = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackContent, setFeedbackContent] = useState('')
  const dispatch = useReduxDispatch()
  const feedbackRequests = useSelector(getFeedbackRequests)
  const allFeedbacksStored = useSelector(allFeedbacks)
  const essays = useSelector(getEssays)
  const { Panel } = Collapse
  const { id } = useParams()
  const { TextArea } = Input
  const history = useHistory()
  //   const [title, setTitle] = useState('Essay Title')

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

  useEffect(() => {
    ;(async () => {
      //   setIsLoading(true)
      try {
        let payload = {
          is_editing_active: true,
        }
        await dispatch(updateFeedbackRequest(parseInt(id), payload))
        // setIsLoading(false)
      } catch (err) {
        // setIsLoading(false)
        message.error('Failed to load essays.')
      }
    })()

    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    return () => {
      ;(async () => {
        // if (feedbackContent) {
        //   return
        // }
        let payload = {
          is_editing_active: false,
        }
        await delay(500)
        await dispatch(updateFeedbackRequest(parseInt(id), payload))
      })()
    }
  }, [])

  const renderContent = () => {
    let panels = []

    if (feedbackRequests[parseInt(id)] && essays[feedbackRequests[parseInt(id)].essay] && !isLoading) {
      let revision = feedbackRequests[parseInt(id)].essay
      let index = essays[revision].revision_of
      let content = ''
      let feedbackRequestId = null

      while (index) {
        content = essays[index]
        feedbackRequestId = null

        for (let key in feedbackRequests) {
          if (feedbackRequests[key]['essay'] == content['pk']) {
            feedbackRequestId = key
            break
          }
        }

        panels.push({
          title: content.name,
          content: content.content,
          feedback: feedbackRequests[feedbackRequestId],
        })

        index = content.revision_of
      }

      panels = panels.map((item, index) => {
        return (
          <Panel header={item.title} key={index + 1}>
            <Row justify="space-between">
              <Col span={10}>
                <Card title="Essay">
                  <p>{item.content}</p>
                </Card>
              </Col>
              <Col span={10}>
                <Card title="Feedback">
                  {item.feedback.feedback ? (
                    <p>{allFeedbacksStored[item.feedback.feedback].content}</p>
                  ) : (
                    'No Feedback available'
                  )}
                </Card>
              </Col>
            </Row>
          </Panel>
        )
      })
    }

    if (isLoading) {
      return (
        <Card className="center">
          <Spin />
        </Card>
      )
    }

    return (
      <>
        <Collapse defaultActiveKey={['1']}>{panels}</Collapse>
      </>
    )
  }

  const handleFeedbackInputChange = e => {
    setFeedbackContent(e.target.value)
  }

  const renderFeedbackContent = () => {
    if (feedbackRequests[parseInt(id)] && essays[feedbackRequests[parseInt(id)].essay] && !isLoading) {
      let revision = feedbackRequests[parseInt(id)].essay
      let content = essays[revision]

      return (
        <Row justify="space-between">
          <Col span={10}>
            <Card title="Essay">
              <p>{content.content}</p>
            </Card>
          </Col>
          <Col span={10}>
            <Card title="Feedback">
              <TextArea rows={8} onChange={e => handleFeedbackInputChange(e)} />
            </Card>
          </Col>
        </Row>
      )
    }

    if (isLoading) {
      return (
        <Card className="center">
          <Spin />
        </Card>
      )
    }
  }

  const handleButtonClick = () => {
    ;(async () => {
      try {
        let essayId = essays[feedbackRequests[parseInt(id)].essay].pk
        let payload = {
          content: feedbackContent,
          essay: essayId,
        }

        await dispatch(addFeedback(parseInt(id), payload))

        message.success('Feedback Succesfully added')
      } catch (err) {
        message.error('Failed to load essays. Please refresh this page to try again.')
      }
    })()
  }

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => history.push('/')}
        title={
          feedbackRequests[parseInt(id)] && essays[feedbackRequests[parseInt(id)].essay] && !isLoading
            ? essays[feedbackRequests[parseInt(id)].essay].name
            : 'Essay Title'
        }
        extra={[
          <Button type="primary" onClick={() => handleButtonClick()}>
            Submit Feedback
          </Button>,
        ]}
      />
      <Card style={{ margin: '20px 10px' }}>{renderContent()}</Card>
      <Card style={{ margin: '20px 10px' }}>{renderFeedbackContent()}</Card>
    </>
  )
}

export default AddFeedback
