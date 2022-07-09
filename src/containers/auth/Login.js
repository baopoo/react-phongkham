import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../../store/actions";
import * as actions from '../../store/actions';
import './Login.scss'
import  {handleLogin}  from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'BaoPoo',
            password: '',
            isShowPassword: true,
            errMsg: '',
        }
    }

    handleOnChangeUsername = (e) => {
        this.setState({username: e.target.value})
        // console.log(e.target.value);
    }
    handleOnChangePassword = (e) => {
        this.setState({password: e.target.value})
        // console.log(e.target.value);
    }
    

    handleLogin = async() => {
        // console.log(this.state.username);
        // console.log(this.state.password);
        this.setState({
            errMsg:'',
        })
        try {
            await handleLogin(this.state.username,this.state.password);
            
        } catch (e) {
            console.log(e);
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMsg: e.response.data.message,
                    });
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({ 
            isShowPassword: !this.state.isShowPassword
        })
    }
    


    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" 
                                className="form-control login-input" 
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(e) =>this.handleOnChangeUsername(e)}
                            />
                        </div>
                        <div className="col-12 form-group login-input password-eye">
                            <label>Password</label>
                            <input type={this.state.isShowPassword ? 'password' : 'text'}
                                className="form-control login-input " 
                                value={this.state.password}
                                onChange={(e) =>this.handleOnChangePassword(e)}
                                placeholder="Enter your password "/>
                            
                            <span
                                onClick={ () => this.handleShowHidePassword() }
                            >
                            {/* <i class="fas fa-eye-slash icon-eye"></i>     */}
                            <i className={this.state.isShowPassword ? 'fas fa-eye-slash icon-eye' : 'fas fa-eye icon-eye'}></i>                        
                            </span>
                        </div>
                        <div className="col-12 " style={{color: "red"}}>
                            {this.state.errMsg}
                        </div>
                        <div className="col-12 wrap-btn" >
                            <button className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password ?</span>
                        </div>
                        <div className="col-12">
                            <span className="login-using">Or Sign Up Using</span>
                        </div>
                        <div className="col-12">
                            <div className="login-social">
                                <i className="fab fa-google icon-google"></i>
                                <i className="fab fa-facebook-f icon-facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
