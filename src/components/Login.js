import React, { useState } from 'react';


const startValues = {
    identifier: "",
    terms: false,
    gamegiftcode: ""
  };


export const Login = ({updateLevel, register, login, createSession}) => {
    const [initialValues, setInitialValues] = useState(startValues);

    const formSubmit = async (values) => {
        let user = null;
        // setLoading(true);
        console.log("values", values);
        try {
            user = await login({ identifier: values.identifier, game_gift_code: values.gamegiftcode });
        } catch (e) {
            console.log(e);
            await register({ email: values.identifier, game_gift_code: values.gamegiftcode });
            try {
                user = await login({ identifier: values.identifier, game_gift_code: values.gamegiftcode });
                console.log("user:", user);
            } catch (e) {
                // console.log(e.response.data.statusCode);
                if (e.length > 0 && e.response.data.statusCode === 403) {
                    // location.reload();
                    const errorResponse403 = [{msg: e.response.data.message || '', url: '', urlmsg: ''}];
                    // errorMessage = e.response.data.message;
                    // openErrorModal(errorResponse403);
                } else if (e.length > 0 && e.response.data.statusCode == 400) {
                    const errorResponse400 = [{msg: e.response.data.message[0].messages[0].message, url: '', urlmsg: ''}];
                    // errorMessage = e.response.data.message[0].messages[0].message;
                    // openErrorModal(errorResponse400);
                } else {
                    console.log(e);
                }
                // else 
                //   console.log(e);
                // if (e.statusCode === 403)
                // location.reload();
            }
        }
        if (user) {
            // Attempt to create bonus master session
            try {
                await createSession({
                    game: "bonus-master",
                });
                // updateLevel(-1);
                // console.log("user:", user);
                // setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
    };

    React.useEffect(() => {
        // const search = window.location.search;
        // const params = new URLSearchParams(search);
        // const username = params.get('username');
        // const game_gift_code = params.get('game_gift_code');
        // // console.log(username, game_gift_code);
        // if (username && game_gift_code) {
        //     formSubmit({identifier: username, terms: true, gamegiftcode: game_gift_code});
        // }
        updateLevel(-1);
      }, [])


    return (
        <div className="welcome-scr-animation-container">
        </div>
    )
}
