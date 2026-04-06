import '/src/home/Home.css'


export const Home = () => {
    return (
        <>
            <div className="home-container">
                <h1 className="home-tittle">The Daily Prophet</h1>
                <div className="img-container">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDem_VlgHvTAvv_n3H8odmuFeFby_uF5ypusShmMyGcpJ1ypW6CugufGaGqDWIbNOTBBbxMSeArn6gJU9WqGoMfbcHbjaNeEtYFZiYUFmPDGQZMWDbCP4jEXTKHvTFct0QjnuukLrIHmhb_BdG95TF7CszeEx-t88W8TLr-SM7cgv7SjjxEC-WX1y6JvWJ-fOpaxP_B5fI5UEdp4TRolD3Vn7jwg74Y1zcoANiphV9NsdXdp7QzkqvGF82eTu2wETrlUehjPMsQWqw"
                        alt="Hogwarts"
                    />
                </div>
                <section className="urgent-section-container">
                    <span className="urgent-section-tittle">Urgent Correspodence</span>
                    <h2 className="urgent-section-subtittle">Reports Surface of a Dark Returs: Rumors of Voldemort's Rebirth Shake the Ministry
                    </h2>
                    <div className="separator-line"></div>
                </section>
                <section className="news-section-container">
                    <div className="news-section-one">
                        <div className="section-one-img">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCff39-uc-4QBamxVbOw7yqCSm2nJj18MRi8xIr--UpaqkrVGubblXWvLG78J-1tiNSZJKgZyUoZil35cbtypTqvYJI15G35yYvCdWFblHw20brWFd9FO87RwY2rlnKErSJ6iWOjoU1vQbej_pNZ8kIX5bnpFydH0VS4esLQoAchMTI7wtTyQZzZMCnuGIDe8HvBS0ZhE743OENM_rz6ztoqTMr3G2CWTgEyQlI9cV142ifOaO6zc7YImZWvHt8eVnsaPrWJo8Lzbs" alt="" />
                        </div>
                        <div className="news-one-container">
                            <span>MAGICAL THEORY</span>
                            <h2 className="title-text-new">10 facts about wands</h2>
                            <p className="body-text-new">Explore the intricate craftsmanship behind the wizard's most essential tool, from dragon heartstring to phoenix feather cores.</p>
                        </div>
                    </div>
                    <div className="news-section-two">
                        <div className="section-two-img">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA4PQ8a5IXG-utgZf8ZApLYK4BKmpGT2a7ZnBax8il5XnRWt95xLj14bYj3-XnE-su2Z9K8v6qoa7Dsk-TH0WG5ziapl2Vq2VBUDgRRLglIfKQmVMtYrrBk0O0czu0y34izRymYICh3m64J_A56KzQlYzcrAL6JUYjKx1KFermlX6-jDtvsX1Yy32LGSC-laH2gFLyP_GN-F2U1OD2d8Tjr16_KV6LHvbEYfMXeVolQszHqjo2E_TUt-GMR60sNgWVElcJ41pw6D0" alt="" />
                        </div>
                        <div className="news-two-container">
                            <span>FORBIDDEN LORE</span>
                            <h2 className="title-text-new">The Restricted Section</h2>
                            <p className="body-text-new">A rare glimpse into the shadows of the Hogwarts Library, where books shriek and secrets of the dark arts reside</p>
                        </div>

                    </div>
                    <div className="news-section-three">
                        <div className="section-three-img">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVV-aqGpZRGsS7IOB_PNs2rQ6qjthILMv4J4a_9Wv3a4XPrKNfBPqwb1ggKANnqxosc4QoveZLiz_73rqwQk4wkSrGDYO879aly4rGrM9ThUGtnwgjRZ1cbCyr3mkD9jq--PoDTqbdW7c9QihVsqbzmp4oz4gAJICcHMpn-JcWF47wArMjmzOSSTJGUjENeQlsjYA-m7wgc55V9I04lKLpv-Qr8pzaKhOx6z7kWQQ53w6Kl4l2Y9i0Se5jsNViLFEmmi9mZiwvR2Q" alt="" />
                        </div>
                        <div className="news-three-container">
                            <span>MAGICAL THEORY</span>
                            <h2 className="title-text-new">10 facts about wands</h2>
                            <p className="body-text-new">Explore the intricate craftsmanship behind the wizard's most essential tool, from dragon heartstring to phoenix feather cores.</p>
                        </div>

                    </div>
                </section>
                <section className="curiosities-container">
                    <h2 className="curiosities-tittle">Curiosities & Lore</h2>
                    <div className="curiosities-cards">
                        <div className="card-one"><span className="material-symbols-outlined">
                            wand_shine
                        </span>
                            <h2>The Floo Network</h2>
                            <p>Ensure your fireplace properly conntected to the Floo Authority before attemting any cross-country travel this winter</p>
                        </div>
                        <div className="card-two"><span className="material-symbols-outlined">
                            skull
                        </span>
                            <h2>Boggart Banishing</h2>
                            <p>Remember: the Riddikulus charm requires a clear mental image of truly amusing. Concentration is key.</p></div>
                        <div className="card-three"><span className="material-symbols-outlined">
                            diamond_shine
                        </span>
                            <h2>Potion Brewing</h2>
                            <p>Stirring counter-clockwis twice every seven rotation will stabilize most base-level potions. Patience is a virtue.</p></div>
                    </div>
                </section>
            </div>
        </>
    )
}
