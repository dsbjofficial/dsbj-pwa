import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import AnswerForm from "./AnswerForm";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: null,
        };
    }

    async componentDidMount() {
        this.fetchAnswers();
    }

    fetchAnswers() {
        const {match: {params}} = this.props;
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/questions/${params.questionId}`)
            .then(response => {
                this.setState({question: response.data})
            });
    }

    render() {
        const {question} = this.state;
        if (question === null) return <p>Loading question...</p>;
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron col-12">
                        <h1 className="display-3">{question.title}</h1>
                        <p className="lead">{question.description}</p>
                        <hr className="my-4"/>
                        <p>Answers</p>
                        {
                            question.answers.map((answer, idx) => (
                                <p key={idx} className="lead">{answer.answer}</p>
                            ))
                        }
                    </div>
                </div>
                <AnswerForm questionId={this.props.match.params.questionId}/>
            </div>
        );
    }
}

export default withRouter(Question);
