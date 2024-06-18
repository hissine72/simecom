import { useAppDispatch,useAppSelector } from "../store/hocjs"  
import { useEffect } from "react"
import { actcatogries } from "../store/catogries/catogriesSlice"
import Category from "../componnents/ecommerce/Catogry/Catogry"
import { Col ,Row,Container} from "react-bootstrap"


const Catogry = () => {
    const dispatch = useAppDispatch()
    const {loading,error,records} = useAppSelector( state =>  state.categories)
    useEffect(()=>{
      if(!records.length){
        dispatch(actcatogries())
      }
        
        
    },[dispatch,records])
    console.log(records.length)
    
   console.log(records)
  const res = records.length > 0 ? records.map((record)=>(
    <Col
            xs={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Category {...record} />
          </Col>
   
  )) : "there is no pram"


 
  return (
    <Container>
      <Row>{res}</Row>
    </Container>
  )
}

export default Catogry;