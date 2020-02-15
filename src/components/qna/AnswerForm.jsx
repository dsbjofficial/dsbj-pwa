import React, {useState} from "react";
import axios from "axios";
import {useAuth0} from "../auth/Auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function AnswerForm(props) {
    const {getTokenSilently} = useAuth0();
    const [answer, setAnswer] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        getTokenSilently().then(token => {
            axios.post(`${process.env.REACT_APP_API_URL}/api/v1/questions/${props.questionId}/answer`,
                {answer},
                {headers: {"Authorization": `Bearer ${token}`}})
                .then(response => {
                    console.log(response);
                })
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAnswer">
                <Form.Label>Add your answer</Form.Label>
                <Form.Control name="answer" value={answer} type="text" placeholder="Details"
                              onChange={e => setAnswer(e.target.value)} as="textarea" rows="5"/>
            </Form.Group>
            <Button type="submit">Post</Button>
        </Form>
    )
}


export default AnswerForm;
