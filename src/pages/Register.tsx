import {Form,Button} from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../store/hocjs"
import { useForm, SubmitHandler } from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useCheckEmailAvailabilty from "../hocks/useCheckEmailAvailabilty"
import { actAuthRegister } from "../store/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom";
const Register = () => {
  const navigat= useNavigate();
  const dispatch = useAppDispatch();

  type Tforminputs = {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    confirmPassword : string;
    idde ?: string;

  }
  const {accessToken} = useAppSelector((state) => state.auth)
  const signupschima = z.object({
    firstName: z.string().min(1,{message:"firstname is required"}),
    lastName: z.string().min(1,{message:"lastname is required"}),
    email: z.string().min(1, { message: "Email address is required" }).email(),
    password:z.string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
    confirmPassword:  z.string()
    .min(1, { message: "Confirm Password is required" }),
}).refine((input) => input.password === input.confirmPassword, {
  message: "Password and Confirm Password does not match",
  path: ["confirmPassword"],
});
  
  const { register ,handleSubmit,formState:{errors},getFieldState,trigger} = useForm<Tforminputs>({
    resolver: zodResolver(signupschima),
    mode: "onBlur"
  });
  
  const {checkEmailavailabilty,emailAvailabiltyStatus, enteredemail,resetcheckemailavailabilty} =useCheckEmailAvailabilty();

  const emailonblurhandler = async (e: React.FocusEvent<HTMLInputElement>)=>{
     await trigger("email")
    const val = e.target.value;
    const {isDirty , invalid} = getFieldState("email")
    if(isDirty && !invalid && enteredemail !== val){
      checkEmailavailabilty(val)
     console.log(isDirty,invalid)
    }
    if(enteredemail && invalid && isDirty ) {
      resetcheckemailavailabilty()
    }
    
  }
  const submitform:SubmitHandler<Tforminputs> = (data)=>{
    const {firstName , lastName , email , password} = data;
 
     dispatch(actAuthRegister({firstName ,lastName ,email , password})).unwrap().then(()=>{
      navigat("/login")
     })
  }
  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <Form onSubmit={handleSubmit(submitform)}>
      <Form.Group >
        <Form.Label> First Name</Form.Label>
        <Form.Control className="mb-3" type="text" {...register("firstName")} isInvalid ={errors.firstName?.message ? true : false} />  
        <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback> 
       
       
      </Form.Group>
      <Form.Group >
        <Form.Label> Last Name</Form.Label>
        <Form.Control className="mb-3" type="text"  {...register("lastName")} isInvalid ={errors.lastName?.message ? true : false} /> 
        <Form.Control.Feedback type="invalid">{errors.lastName?.message }</Form.Control.Feedback>     
      </Form.Group>
      <Form.Group >
        <Form.Label>Email address</Form.Label>
        <Form.Control className="mb-3" type="text" {...register("email")} isValid={emailAvailabiltyStatus ? true : false} isInvalid ={ emailAvailabiltyStatus ? true : false} onBlur={emailonblurhandler}  /> 
        {/* <Form.Control.Feedback type="invalid">{errors.email?.message }</Form.Control.Feedback>  */}
        <Form.Control.Feedback type="valid">{emailAvailabiltyStatus === "available" ? "this email is available to use" :""}</Form.Control.Feedback> 
        <Form.Text muted> {emailAvailabiltyStatus === "checking" ? "we are checking availablity" : ""} </Form.Text> 
         
        
      </Form.Group>

      <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control className="mb-3" type="password" {...register("password")}  isInvalid ={errors.password?.message ? true : false}/>
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        
      </Form.Group>
      <Form.Group >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control className="mb-3" type="password" {...register("confirmPassword")}  isInvalid ={errors.confirmPassword?.message ? true : false} />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Register;