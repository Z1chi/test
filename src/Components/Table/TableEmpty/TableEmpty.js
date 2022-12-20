import React from 'react';

import './tableEmpty.scss';

export const TableEmpty = ({icon, text, button, link, loader: Loader}) => {
    return (
        <div className='tableEmpty'>
            { icon && <div className='tableEmpty__icon'>
                <img src={icon} alt={'icon'}/>
            </div> }
            <div className='tableEmpty__text'>
                <p>{text}</p>
                { Loader && <Loader /> }
            </div>

            {/*{button && <div className='tableEmpty__button'>*/}
            {/*    {*/}
            {/*        button.link*/}
            {/*            ? <Link to={button.link}>{button.text}</Link>*/}
            {/*            : <Button {...button} />*/}
            {/*    }*/}

            {/*</div>}*/}
        </div>
    )
};