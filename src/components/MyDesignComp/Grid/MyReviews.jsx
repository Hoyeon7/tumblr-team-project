import {
    ButtonComp,
    ProfileComp,
    ModalComp,
    StarRating,
    SliderComp,
  } from '../../index-comp/IndexComp'
import '../../Review/grid/Temp.scss'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { dataResultModule } from '../../../modules/firebaseData'
import TempReviewThumbnail from '../../Review/grid/TempReviewThumbnail'
import { Col, Container, Row } from 'react-bootstrap'
  
  const MyReviewsComp = (user) => {
    const { review } = useSelector(state => state.firebaseData);
    
    const dispatch = useDispatch();
    const getData = useCallback(()=>dispatch(dataResultModule()),[dispatch]);
    useEffect( () => getData(), []);
    console.log(review)
    const uid = user.user.uid;
    const myReviews = review.filter( r => r.data.user.uid === uid )
    myReviews.map(r=>console.log(r.data))

    return (
      <div className='my_review' >
        <div className="header">
            <h3 id="title">나의 리뷰</h3>
            
        </div>
        <Container fluid="sm">
        <Row>
        { myReviews.length >=1 ? myReviews.map( myReview =>
        //const { review, rating, tages, user, images } = myReview.data
        ( <Col xl="2" lg="3" md="4" sm="6" className="review_card" key={myReview.id} >
            <ModalComp
              button={<TempReviewThumbnail review={myReview.data} />}
              image={
                <SliderComp dots={false} infinite={true}>
                  { Object.values(myReview.data.images).map( image => (
                    <div>
                      <img id="image" src={image} key={image} alt="review-image" />
                    </div>
                  ))}
                </SliderComp>
              }
              className="review_modal" 
            >
            <div className="modal_top">
              <div className="star">
                <StarRating rating={myReview.data.rating} />
              </div>
            </div>
    
            <div className="modal_body">
              <h5 className="modal_title">임시제목</h5>
              <div className="option">
                <p>옵션01</p>
                <p>옵션02</p>
                <p>옵션03</p>
                <p>옵션04</p>
              </div>
              <div className="hashtag">
                {myReview.data.tages.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <p>{myReview.data.review}</p>
              <div className="score">
                <i>
                  <FontAwesomeIcon icon={regular('eye')} />
                </i>
                <span>1234</span>
                <i>
                  <FontAwesomeIcon icon={regular('heart')} />
                </i>
                <span>1234</span>
              </div>
            </div>
    
            <div className="modal_footer">
              <div className="profile_block">
                <ProfileComp justName imageURL={myReview.data.user.photoURL} size="md" />
                <div>
                  <p>{myReview.data.user.displayName}</p>
                  <p className="caption">2022-06-07</p>
                </div>
              </div>
              <div>
                <ButtonComp icon>
                  <FontAwesomeIcon icon={solid('heart')} />
                </ButtonComp>
                <ButtonComp icon>
                  <FontAwesomeIcon icon={solid('share-nodes')} />
                </ButtonComp>
              </div>
            </div>
          </ModalComp> </Col>)
          ) : ( <p>작성한 리뷰가 없습니다</p>)
        }
        </Row>
      </Container>
    </div>
  )
}

  export default MyReviewsComp