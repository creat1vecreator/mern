import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {

    const auth = useContext(AuthContext)
    const [link, setLink] = useState('');
    const {request} = useHttp();

    const pressHandler = async evt => {
        if(evt.key === 'Enter') {
            console.log("Token from auth context:", auth.token);
            try {
              const data = await request('/api/link/generate', 'POST', {from: link}, {
                  Authorization: `Bearer ${auth.token}`
              });
                console.log(data);
            }
            catch (e){

            }
        }
    }
    useEffect(() => {
        window.M.updateTextFields();
    })


    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{padding: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => {
                          setLink(e.target.value)
                        }}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}

