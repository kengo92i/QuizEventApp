import * as React from "react";
import {ConsoleState, Score} from "../Entities";
import {List} from "immutable";
import {browserHistory} from "react-router";
import {DispatchActions} from "../DispatchActions";

interface Props {
    state: ConsoleState;
    questionNum: number;
    actions: DispatchActions;
}

interface State {
    ranking: List<Score>;
}


export default class ConsoleRoot extends React.Component<Props, State> {

    state: State = {ranking: List.of<Score>()};

    componentDidMount(){
        this.props.actions.rankListEachQuestion(this.props.questionNum)
    }

    goNext(rank: number) {
        if (rank <= 0) return;

        setTimeout(() => {
            const score = this.props.state.ranking[rank - 1];
            console.log(score);
            const ranking = this.state.ranking.push(score);
            this.setState({ ranking: ranking });
            this.goNext(rank - 1)
        }, 0);
    }

    render() {
        const rankASC = this.state.ranking.reverse();
        const questionNum = this.props.questionNum;
        const ranks = rankASC.map((score: Score) =>
          <li key={score.rank} className="list-group-item text-center">
              <span className="glyphicon glyphicon-star" style={{color: "orange"}} />
              {score.rank}位 {score.name}[+{score.correctNum}pt]：, 回答時間 {score.time} 秒
          </li>);

        let showButton = <button className="btn btn-danger btn-lg center-block" onClick={() => this.goNext.bind(this)(this.props.state.ranking.length)}>表示</button>;

        return (
            <div className="ranking container">
                <div className="row">
                    <div className="panel panel-default panel-ranking col-xs-10 col-xs-offset-1">
                        <h2 className="text-center">第{questionNum}問: 早解きランキング</h2>
                        {showButton}
                    </div>
                </div>
                <ul className="list-group">
                    {ranks}
                </ul>
            </div>
        )
    }
}
