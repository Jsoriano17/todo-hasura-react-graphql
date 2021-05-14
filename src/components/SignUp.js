import React from 'react'
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div>
            <h1 style={styles.header}>Sign In</h1>
            <form style={styles.form}> 
                <label>First name</label>
                <input/>
                <label>Last name</label>
                <input/>
                <label>email</label>
                <input/>
                <label>passord</label>
                <input/>
                <button type="submit">login</button>
            </form>
            <Link to={'/'}>
                <button style={styles.margin}>Log in</button>
            </Link>
        </div>
    )
}

const styles = {
    header: {
      color: "purple",
      marginLeft: "30px",
      fontSize: "50px",
    },
    list: {
      fontSize: "30px",
      marginLeft: "40px",
    },
    margin: {
      marginLeft: "30px",
      marginTop: '10px'
    },
    marginButton: {
      marginLeft: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "30%",
        marginLeft: "30px",
        marginTop: "30px",
      }
  };
export default SignUp
