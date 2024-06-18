import {Form,Button} from "react-bootstrap"
import { useForm, SubmitHandler } from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "../store/hocjs"
import { useNavigate } from "react-router-dom"
import { actAuthLogin } from "../store/auth/authSlice"
import { Navigate } from "react-router-dom";
const Login = () => {
    type Tforminputs = {
    email : string;
    password : string;
  
  }
  const dispatch = useAppDispatch();
  const navigate =useNavigate()
const {accessToken,user,error} = useAppSelector((state) => state.auth)

  
  
  const signupschima = z.object({
    email: z.string().min(1,{message:"email is required"}),
    password:z.string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
  })

  const {register,handleSubmit,formState:{errors}} =useForm<Tforminputs>({
    resolver: zodResolver(signupschima),
    mode: "onBlur",
  })


  const submitform: SubmitHandler<Tforminputs> =(data)=>{
    const { email , password} = data;
    dispatch(actAuthLogin({email , password})).unwrap().then(()=>{
      navigate("/");
     })


    // console.log(user)
  }
  console.log(error)

  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <Form onSubmit={handleSubmit(submitform)}>
      
      <Form.Group >
        <Form.Label>Email address</Form.Label>
        <Form.Control className="mb-3" type="text" {...register("email")}  isInvalid={errors.email?.message ? true : false}/>
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control className="mb-3" type="password" {...register("password")} isInvalid = {errors.password?.message ? true : false} />
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
      </Form.Group>
     
      
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    
  )
}

export default Login