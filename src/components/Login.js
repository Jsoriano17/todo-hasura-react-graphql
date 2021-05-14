import React from 'react'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h1 style={styles.header}>login</h1>
            <form style={styles.form}> 
                <label>email</label>
                <input/>
                <label>passord</label>
                <input/>
                <button type="submit">login</button>
            </form>
            <Link to={'/signup'}>
                <button style={styles.margin}>Sign up</button>
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

export default Login
