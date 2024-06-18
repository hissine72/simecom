import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";

const Google = () => {
  // const navigate = useNavigate()
  return (
      <div style={{
        overflowX: 'hidden',
        height: '100%',
    
      }}>
        <GoogleLogin
          width={'50%'}

          onSuccess={(credentialResponse) => {
            //  const decoded = jwtDecode( credentialResponse.credential as string);
            // navigate(()=><Home/>)
            // ()=> navigate("/cart")
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
  );
};

export default Google;
