import React from 'react';
import {useEffect, useState} from "react";
import useDebounce from "../hooks/use-debounce";
import api from "../../axios-instances";


const EditorMarkdown = (props) => {

    const [mdMarkdown, setMarkdown] = useState('')
    const [mdRender, setMdRender] = useState('')

    const debouncedSearchTerm = useDebounce(mdMarkdown, 700);
    //const apiUrl = `${process.env.REACT_APP_BACKEND_ADDRESS}/api`

    function sendMarkdown(value) {
        api.get('',{
            params:{
                markdown: mdMarkdown
            }
        })
            .then(response => setMdRender(response.data))
            .catch(error => setMdRender(error.message))
        // axios.get(`http://${apiUrl}?markdown=${value}`)
        //     .then(response => setMdRender(response.data))
        //     .catch(error => {
        //         setMdRender(error.message)
        //     });
    }

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                sendMarkdown(debouncedSearchTerm)
            } else {
                setMdRender('');
            }
        },
        [debouncedSearchTerm]
    );

    return (
        <div className="editor">
            <h1>{props.title}</h1>
            <div className="editor-area">
                <div className="input-area">
                    <textarea placeholder={process.env.REACT_APP_BACKEND_ADDRESS}
                              onChange={(e) => setMarkdown(e.target.value)}>
                    </textarea>
                </div>
                <div className="render-area" dangerouslySetInnerHTML={{__html: mdRender}}></div>
            </div>
        </div>
    );
};

export default EditorMarkdown;