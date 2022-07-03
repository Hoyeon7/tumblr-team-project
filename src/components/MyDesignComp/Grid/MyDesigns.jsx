import "./DesignsGrid.scss";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, OverlayTrigger, Popover, Overlay } from "react-bootstrap";
import { CUP_PICS } from "../../../images";
import { ButtonComp, ModalComp, ProfileComp } from "../../index-comp/IndexComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
//import { getMyDesign } from "../../../modules/uploadDesign";
import { useDispatch, useSelector } from "react-redux";
import { getFirebaseData } from "../../../datasources/firebase";
import { loadingStart, loadingEnd } from "../../../modules/loading";
import { useCallback } from "react";
import { async, deepCopy } from "@firebase/util";
import { useNavigate } from "react-router-dom";

export default function MyDesigns(user) {
    const [ designs, setdesigns ] = useState([]);
    const [ show, setShow ] = useState(false);
    const [ target, setTarget ] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef();

    // const startLoading = useCallback(dispatch(loadingStart()));
    // const endLoading = useCallback(dispatch(loadingEnd()));

    // 나의디자인 가져오기 - 인증된 유저의 디자인만 가져오기
    const getDesign = () => async () => {
        try{
            let array = [];
            const designColRef = getFirebaseData("MyDesign"); // 파이어스토어 컬렉션 문서 가져오기
            (await designColRef).forEach( (doc) => {
                array.push({ 
                    id: doc.id, 
                    title: doc.data().title, 
                    text: doc.data().text,
                    image: doc.data().image,
                    tag: doc.data().tag,
                    private: doc.data().private,
                    userid: doc.data().userid
                    
                });
            });
            setdesigns(array);
        } catch (e) { console.log(e) }
            
        
        
    }
    //const myDesign = designs.filter( d => (d.userid == user.user.uid) );
    //console.log(myDesign)
    useEffect(()=> {dispatch(getDesign());}, [dispatch])

    const handleClick = (e) => {
        setShow(!show)
        setTarget(e.target)
    }
    // 삭제버튼 클릭시
    const deletePost = (id) => {
        
    }
    

    return (
        <>
        <div className="header">
            <h3 id="title">나의 디자인</h3>
            <a href="#">더보기</a>
        </div>

        <Container fluid="sm">
        <Row>
            {
                designs.map( design => {
                        (<Col xl="2" lg="3" md="4" sm="6" key={design.id}>
                            <ModalComp 
                            button={
                                <div id="temp_image">
                                    <p>{design.title}</p>
                                </div>
                                }//<img id="preview-image" src={design.image} alt={design.title}/>
                            image={<img src={design.image} alt={design.title}/>}
                            className="design_modal"
                            >
                            <div className="modal_head" ref={ref}>
                                <h2>{design.title}</h2>
                                
                                <ButtonComp icon onClick={handleClick}>
                                    <FontAwesomeIcon icon={solid("ellipsis-vertical")} />
                                </ButtonComp>
                                <Overlay
                                    show={show}
                                    target={target}
                                    placement="left"
                                    container={ref}
                                    containerPadding={20}
                                    rootClose
                                    onHide={() => setShow(false)}
                                >
                                    <Popover id="ellipsis_popover">
                                        <ButtonComp icon onClick={() => navigate(`/edit/${design.id}`)}>
                                            <FontAwesomeIcon icon={solid("pen-to-square")}/> 수정
                                        </ButtonComp> <br/>
                                        <ButtonComp icon onClick={()=> deletePost(design.id)}>
                                            <FontAwesomeIcon icon={solid("trash-can")}/> 삭제
                                        </ButtonComp>
                                    </Popover>
                                    
                                </Overlay>
                                
                            </div>
                                {design.private === true ? (
                                    <span style={{ fontSize: "smaller", color: "gray" }}>
                                        <FontAwesomeIcon icon={solid("lock")}/> 비공개 게시물입니다
                                    </span>) : null}
                            <div className="modal_body">
                                <p>{design.text}</p>
                                <div className="hashtag">
                                    {design.tag.map(tag=><span key={tag}>{tag}</span>)}
                                    {/* { design.tag.map( (tag, i) => (
                                        <span key={i}>{tag}</span>
                                    ))} */}
                                </div>
                            </div>

                            <div className="modal_footer">
                                
                                <ProfileComp
                                className="profile" 
                                justName 
                                userName={"user1"} 
                                imageURL={'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'}
                                />
                                
                                <div className="button_block">
                                <ButtonComp icon id="like_btn">
                                    <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                                </ButtonComp>
                                <ButtonComp icon id="share-btn">
                                    <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                                </ButtonComp>  
                                <ButtonComp icon id="create-btn" onClick={() => {navigate('/create')}}>
                                    제작하러가기
                                </ButtonComp>
                                </div>
                            </div>
                                
                            
                        </ModalComp>
                        </Col>)
                    }
                )
            }
        </Row>
        <Row>
            {
                CUP_PICS.map( cup_pic=>(
                <Col xs="6" md="3" key={cup_pic.id}>
                    <ModalComp 
                    button={<img id="preview-image" src={cup_pic.src} alt={cup_pic.title}/>}
                    image={<img src={cup_pic.src} alt={cup_pic.title}/>}
                    className="design_modal"
                    >
                    <div className="modal_head">
                        <div className="text_block">
                        <h2>제목</h2>
                        
                        </div>
                    </div>

                    <div className="modal_body">
                        <p>내용</p>
                        <div className="hashtag">
                        <span>#태그1 </span>
                        <span>#태그2 </span>
                        <span>#태그3 </span>
                        </div>
                    </div>

                    <div className="modal_footer">
                        <ProfileComp
                        className="profile" 
                        justName 
                        userName={"user1"} 
                        imageURL={'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'}
                        />
                        <div className="button_block">
                        <ButtonComp icon id="like_btn">
                            <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                        </ButtonComp>
                        <ButtonComp icon id="share-btn">
                            <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                        </ButtonComp>  
                        <ButtonComp icon id="create-btn" onClick={() => {navigate('/create')}}>
                            제작하러가기
                        </ButtonComp>
                        </div>
                    </div>
                        
                    
                </ModalComp>
                </Col>
                ))
            }
            </Row>
        </Container>
    </>
    );
}
