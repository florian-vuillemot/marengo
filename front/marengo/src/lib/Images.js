import React, { Component } from 'react';
import { TableCell } from './GenericTable'
  
class Images extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        img1: this.props.images[0].toString(),
        img2: this.props.images[1].toString(),
        img3: this.props.images[2].toString(),
        img4: this.props.images[3].toString()
      };

      this.httpClient = props.httpClient;
    }

    showImage = img => {
      const url = this.httpClient.baseURL;
      const jwt = this.httpClient.jwt;
      const separator = img.includes('?') ? '&' : '?';
      const src = `${url}/image/${img}${separator}jwt=${jwt}`;
      return <img src={src} className="Select-image" alt="" />;
    }
    newImage = img => <input type="file" accept="image/*,.pdf" onChange={(e) => this.updateImg(img, e.target.files[0])} />;

    updateImg(img, file) {
      const imgName = this.state[img];
      const headers = {headers: {'Content-Type': 'multipart/form-data'}};
      const data = new FormData();

      data.append('file', file);
      return this.httpClient.post(`/image/${imgName}`, data, headers)
        .then(() => this.setState({[img]: `${imgName}?nocache=${Math.random()}`}))
        .catch((error) => {      
          console.log('error',error);
        });
    }

    render() {
        return (
          <table>
            <tbody>
              <tr>
                <td>{this.showImage(this.state.img1)}</td>
                <td>{this.showImage(this.state.img2)}</td>
              </tr>
              <tr>
                <td>{this.newImage('img1')}</td>
                <td>{this.newImage('img2')}</td>
              </tr>
              <tr>
                <td>{this.showImage(this.state.img3)}</td>
                <td>{this.showImage(this.state.img4)}</td>
              </tr>
              <tr>
                <td>{this.newImage('img3')}</td>
                <td>{this.newImage('img4')}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                {TableCell("Validate-button", "Retour", 2, () => this.props.cb())}
              </tr>
            </tfoot>
          </table>
        );
    }
}

export default Images;