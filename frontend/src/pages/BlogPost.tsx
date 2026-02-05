export default function BlogPost() {
  return (
    <section className="py-5">
      <div className="container px-5 my-5">
        <div className="row gx-5">
          <div className="col-lg-3">
            <div className="d-flex align-items-center mt-lg-5 mb-4">
              <img className="img-fluid rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="" />
              <div className="ms-3">
                <div className="fw-bold">Valerie Luna</div>
                <div className="text-muted">News, Business</div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">Welcome to Blog Post!</h1>
                <div className="text-muted fst-italic mb-2">January 1, 2023</div>
                <a className="badge bg-secondary text-decoration-none link-light" href="#">Web Design</a>
                <a className="badge bg-secondary text-decoration-none link-light ms-2" href="#">Freebies</a>
              </header>
              <figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="" /></figure>
              <section className="mb-5">
                <p className="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind...</p>
                <p className="fs-5 mb-4">The universe is large and old, and the ingredients for life as we know it are everywhere...</p>
                <p className="fs-5 mb-4">If you get asteroids about a kilometer in size...</p>
                <h2 className="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                <p className="fs-5 mb-4">For me, the most fascinating interface is Twitter...</p>
                <p className="fs-5 mb-4">Venus has a runaway greenhouse effect...</p>
              </section>
            </article>
            <section>
              <div className="card bg-light">
                <div className="card-body">
                  <form className="mb-4"><textarea className="form-control" rows={3} placeholder="Join the discussion and leave a comment!"></textarea></form>
                  <div className="d-flex mb-4">
                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="" /></div>
                    <div className="ms-3">
                      <div className="fw-bold">Commenter Name</div>
                      If you're going to lead a space frontier, it has to be government...
                      <div className="d-flex mt-4">
                        <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="" /></div>
                        <div className="ms-3">
                          <div className="fw-bold">Commenter Name</div>
                          And under those conditions, you cannot establish a capital-market evaluation of that enterprise.
                        </div>
                      </div>
                      <div className="d-flex mt-4">
                        <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="" /></div>
                        <div className="ms-3">
                          <div className="fw-bold">Commenter Name</div>
                          When you put money directly to a problem, it makes a good headline.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="" /></div>
                    <div className="ms-3">
                      <div className="fw-bold">Commenter Name</div>
                      When I look at the universe and all the ways the universe wants to kill us...
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
} 