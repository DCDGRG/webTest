import React from 'react'

export default function PortfolioOverview() {
  return (
    <>
      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h1 className="fw-bolder">Our Work</h1>
            <p className="lead fw-normal text-muted mb-0">Company portfolio</p>
          </div>
          <div className="row gx-5">
            {[1,2,3,4].map((i) => (
              <div key={i} className="col-lg-6">
                <div className={i < 3 ? 'position-relative mb-5' : 'position-relative'}>
                  <img className="img-fluid rounded-3 mb-3" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" />
                  <a className="h3 fw-bolder text-decoration-none link-dark stretched-link" href="#">Project name</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container px-5 my-5">
          <h2 className="display-4 fw-bolder mb-4">Let's build something together</h2>
          <a className="btn btn-lg btn-primary" href="#">Contact us</a>
        </div>
      </section>
    </>
  )
} 