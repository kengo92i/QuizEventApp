import * as React from "react";
import {Range} from "immutable";
import {ConsoleState} from "../Entities";
import {browserHistory} from "react-router";
import {DispatchActions} from "../DispatchActions";

interface Props {
    state: ConsoleState;
    actions: DispatchActions;
}

export default class ConsoleRoot extends React.Component<Props, {}> {

    componentDidMount(){
        this.props.actions.loadQuestions();
    }

    showQuiz(n: number){
        this.props.actions.showQuiz(n)
    }

    showAnswer(n: number){
        this.props.actions.showAnswer(n)
    }

    render() {
        const buttons = Range(1, this.props.state.questions.length + 1).map((n)=> {
            const quizClass = this.props.state.showedQuizs.contains(n) ? 'btn-default' : 'btn-primary';
            const answerClass = this.props.state.showedAnswers.contains(n) ? 'btn-default' : 'btn-warning';
            return (
                <div key={n}>
                    <h3>問題{n}</h3>
                    <div className="btn-group" style={{width: "100%"}}　role="group">
                        <button type="button" className={`btn ${quizClass}`} style={{width: "80%"}}　onClick={() => this.showQuiz.bind(this)(n)}>問題{n}を配信する</button>
                        <button type="button" className={`btn ${answerClass}`}　style={{width: "20%"}}　onClick={() => this.showAnswer.bind(this)(n)}>回答{n}</button>
                    </div>
                </div>
            )
        });

        return (
            <div className="container">
                <h2>管理コンソール</h2>
                <div style={{background: "white", padding: "10px", border: "5px solid #363636"}}>
                {buttons}
                <hr/>
                <div className="text-right">
                    <span>すべての問題を出題した後にランキングを表示する -></span>
                    <button className="btn btn-danger" style={{margin: "15px"}}　onClick={() => browserHistory.push('/ranking')}>go ランキング</button>
                </div>
                </div>
            </div>
        )
    }
}
