import './Review.scss'
import { Col, Container, Row } from 'react-bootstrap'
import ReviewModalComp from '../../components/Review/grid/ReviewModalComp'
import { ButtonComp, Pagination } from '../../components/index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { dataResultModule } from '../../modules/firebaseData'
import { getFirebaseData } from '../../datasources/firebase'
import { loadingEnd, loadingStart } from '../../modules/loading'

const ReviewPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  const goReviewWrite = () => {
    navigate('/review/write')
  }
  
  const [review, setReview] = useState([])

  const getReviews = () => async () => {
    document.body.style.overflow = 'hidden'
    try {
      startLoading()
      let array = []
      const reviewRef = getFirebaseData('Review')
      ;(await reviewRef).forEach((doc) => {
        array.push({
          id: doc.id,
          rating: doc.data().rating,
          tages: doc.data().tages,
          review: doc.data().review,
          images: doc.data().images,
          user: doc.data().user,
          createdAt: doc.data().createdAt,
          itemName: doc.data().itemName,
          itemColor: doc.data().itemColor,
          boughtDate: doc.data().boughtDate,
        })
      })
      setReview(array)
      document.body.style = ''
      endLoading()
    } catch (e) {
      console.log(e)
      document.body.style = ''
      endLoading()
    }
  }

  useEffect(() => {
    dispatch(getReviews())
  }, [dispatch])

  return (
    <div className="review_page">
      <div>
        <h1>포토리뷰</h1>
        <Container fluid>
          <Row>
            { review &&
              review.map((r) => (
                <Col
                  xl="2"
                  lg="3"
                  md="4"
                  sm="6"
                  key={r.id}
                  className="review_card"
                > 
                  <ReviewModalComp review={r} />
                </Col>
              ))}
          </Row>
        </Container>
      </div>

      {/** plus 버튼 누르면 /review/write 페이지 이동 */}
      <div>
        <ButtonComp
          icon
          style={{ display: 'inline', float: 'right' }}
          onClick={goReviewWrite}
        >
          <FontAwesomeIcon icon={solid('circle-plus')} size="2x" />
        </ButtonComp>
        <br />
        {/** 페이징 */}
        <Pagination />
      </div>
    </div>
  )
}
export default ReviewPage
