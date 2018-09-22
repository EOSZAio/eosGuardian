import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    
    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    onLoginSucess() {
        this.setState({ 
            email: '',
            password: '',
            error: '',
            code: '',
            loading: false 
        });
    }

    onEmailChange(text) {
        console.log('onEmailChange', this.props);
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size='small' />;
        }

        return (
        
        <Button onPress={this.onButtonPress.bind(this)}>
              Log In
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        onChangeText={this.onEmailChange.bind(this)}
                        label="Email"
                        placeholder='user@gmail.com'
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        placeholder='password'
                        onChangeText={this.onPasswordChange.bind(this)}
                        label='Password'
                        isPassword
                        value={this.props.password}
                    />
                </CardSection>

                <Text style={styles.errorStyle}>
                    {this.props.code}
                </Text>

                <Text style={styles.errorStyle}>
                    {this.props.error}
                </Text>

                <CardSection>
                   {this.renderButton()}
        </CardSection>

            </Card>
        );
    }

}

const styles = {
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    console.log('state', state);
    const { email, password, loading, error, code } = state.auth;
    return { email, password, loading, error, code };
   /* return {
        email: state.auth.email,
        password: state.auth.password,
        loading: state.auth.loading,
        error: state.auth.error,
        code: state.auth.code
    };*/
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser 
})(LoginForm);
