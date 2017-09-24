import * as React from "react";
import * as ReactDOM from "react-dom";
import {browserHistory} from "react-router";
import objectAssign = require('object-assign');
const Select = require('react-select');

interface Props {
    state: any;
}

interface State {
    name: string;
    deps: string;
}

// ご自由に変更してください。
const depsList: string[] = [
    "企画",
    "エンジニア",
    "クリエイティブ",
    "その他",
];

export default class ChatRoot extends React.Component<Props, State> {

    state: State = {name: "", deps: null};

    depsList: string[] = depsList;

    login(): void {
        if (this.state.name.trim() === '') return;
        browserHistory.push('/noukai/' + this.state.name + '/' + this.state.deps);
    };

    changeName(e:any): void {
        this.setState(objectAssign({}, this.state, {name: e.target.value}));
    };

    changeDeps(val: any) {
        this.setState(objectAssign({}, this.state, {deps: val.value}));
        const comp:any = ReactDOM.findDOMNode(this.refs["nameInput"]);
        comp.focus();
    }

    render() {
        const options = this.depsList.map((v: string) => {return { value: v, label: v }});
        return (
          <div className="login container">
              <h2 className="text-center">- Login -</h2>
              <div className="row">
                  <div className="panel panel-default col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                      <div className="panel-body">
                          <div className="form-group">
                              <Select
                                placeholder="所属名"
                                name="form-field-name"
                                value={this.state.deps}
                                options={options}
                                onChange={this.changeDeps.bind(this)} />
                          </div>

                          <div className="form-group">
                              <input
                                onChange={this.changeName.bind(this)}
                                value={this.state.name}
                                className="form-control"
                                ref="nameInput"
                                placeholder="おなまえ" />
                          </div>

                          <div className="text-center">
                              <button onClick={this.login.bind(this)} className="btn btn-warning btn-block start-button">参加する</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}
