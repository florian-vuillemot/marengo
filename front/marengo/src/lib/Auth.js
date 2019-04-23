import React, { Component } from 'react';
const axios = require('axios');

const baseURL = 'http://api.marengo-ledm.eu';
const httpClient = axios.create({
  baseURL: baseURL,
});
httpClient.baseURL = baseURL;


class Auth extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: null,
            password: null
        };

        this.update = this.update.bind(this);
    }

    update(name, event) {
        this.setState({[name]: event.target.value});
    }

    saveData() {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        httpClient.post('/user/login', data)
        .then(data => {
            const jwt = data.data.access_token;
            httpClient.jwt = jwt;
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            this.props.setHttpClient(httpClient);
        })
        .catch(e => console.log(e));
    }
    

    render() {
        const _input = (field, type) => <input type={type} onChange={e => this.update(field, e)}/>
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            Nom:
                        </td>
                        <td>
                            {_input('username', 'text')}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Mot de passe:
                        </td>
                        <td>
                            {_input('password', 'password')}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="submit" onClick={() => this.saveData()} value="Valider" />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Auth;
