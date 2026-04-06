import '/src/shared/footer/Footer.css'

export const Footer = () => {
    return (
        <>
            {/* <div className="separator-line"></div> */}
            <div className="footer-container">
                <div className="left-content">
                    <h3>The Enchanted Editorial</h3>
                    <span>&copy; 1997 - 2024 THE ARCANE ARCHIVIST. ALL SPELLS RESERVED</span>
                </div>
                <div className="right-content">
                    <p>ARCHIVES</p>
                    <p>TERMS OF ENCHANTMENT</p>
                    <p>PRIVACY QUILL</p>
                </div>
            </div>
        </>
    )
}
