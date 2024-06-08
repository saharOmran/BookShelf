import React from 'react'


const NavTop = ({sticky}) => {
    return (
        <nav className={sticky ? "notshow" : "navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"} >
            <div className="container text-light">
                <div className="w-100 d-flex justify-content-between">
                    <div>
                       
                         
                        
                    </div>
                    <div className="mx-5">
                           
                    
                    </div>
                </div>
            </div>
        </nav>
        

    );
}

export default NavTop;