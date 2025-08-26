

export default function Pricing() {
  return (
    <>
      <header className="py-5 bg-primary">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-6">
              <div className="text-center my-5">
                <div className="text-center mb-4">
                  <img src="/logo.svg" alt="奎星电子科技" className="mb-3" style={{height: '80px', width: 'auto', filter: 'brightness(0) invert(1)'}} />
                </div>
                <h1 className="fw-bolder mb-3 text-white">产品服务与价格</h1>
                <p className="lead fw-normal text-white mb-4">我们提供从模具设计到成品交付的一站式服务，根据您的具体需求定制最优解决方案</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 核心服务项目 */}
      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">🛠 核心服务项目</h2>
            <p className="lead fw-normal text-muted mb-0">专业的技术团队，先进的设备设施，为您提供高品质的产品和服务</p>
          </div>
          <div className="row gx-5 justify-content-center">
            {/* 模具设计与制造 */}
            <div className="col-lg-6 col-xl-4 mb-4">
              <div className="card h-100 shadow border-0 elegant-shadow">
                <div className="card-header bg-success bg-gradient text-white text-center py-4">
                  <h4 className="text-uppercase m-0">模具设计与制造</h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="display-4 fw-bold text-success">¥15,000</div>
                    <div className="text-muted">起 / 套</div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>3D数据确认与模流分析</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>精密模具设计与制造</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>CNC加工中心精密加工</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>沙迪克火花机精加工</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>模具试模与调试</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>质量检测与验收</li>
                  </ul>
                  <div className="d-grid">
                    <a className="btn btn-outline-success" href="/contact">咨询详情</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 注塑成型 */}
            <div className="col-lg-6 col-xl-4 mb-4">
              <div className="card h-100 shadow border-0 elegant-shadow">
                <div className="card-header bg-success bg-gradient text-white text-center py-4">
                  <h4 className="text-uppercase m-0">
                    <i className="bi bi-star-fill text-warning me-2"></i>注塑成型
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="display-4 fw-bold text-success">¥0.8</div>
                    <div className="text-muted">起 / 件</div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>50T-800T注塑机台</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>双色注塑与立式注塑</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>薄壁高速注塑工艺</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>PEEK/PEI/PPSU等特种材料</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>医疗级无尘注塑车间</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>批量生产与质量控制</li>
                  </ul>
                  <div className="d-grid">
                    <a className="btn btn-success" href="/contact">立即咨询</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 表面处理 */}
            <div className="col-lg-6 col-xl-4 mb-4">
              <div className="card h-100 shadow border-0 elegant-shadow">
                <div className="card-header bg-warning bg-gradient text-white text-center py-4">
                  <h4 className="text-uppercase m-0">表面处理</h4>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <div className="display-4 fw-bold text-warning">¥2.5</div>
                    <div className="text-muted">起 / 件</div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>10万级无尘喷漆车间</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>自动喷漆与UV流水线</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>丝印、移印、烫金工艺</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>表面纹理与质感处理</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>色差检测与质量控制</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>环保材料与工艺</li>
                  </ul>
                  <div className="d-grid">
                    <a className="btn btn-outline-warning" href="/contact">咨询详情</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品应用领域展示 */}
      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">🏭 产品应用领域</h2>
            <p className="lead fw-normal text-muted mb-0">我们为多个行业提供高性能塑料零部件解决方案</p>
          </div>
          <div className="row gx-5">
            {/* 汽车零部件 */}
            <div className="col-lg-6 mb-5">
              <div className="card h-100 elegant-shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-car-front-fill fs-4"></i>
                    </div>
                    <h4 className="mb-0">汽车零部件</h4>
                  </div>
                  <p className="text-muted mb-3">专业制造汽车用高性能塑料零部件，包括内饰件、外饰件、功能件等</p>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">PBT-GF30</span>
                      <span className="badge bg-light text-dark me-1 mb-1">PPSU</span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">PFA</span>
                      <span className="badge bg-light text-dark me-1 mb-1">PA66</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">轻量化 · 高强度 · 耐腐蚀</small>
                    <a href="#" className="btn btn-sm btn-outline-primary">了解更多</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 医疗器械 */}
            <div className="col-lg-6 mb-5">
              <div className="card h-100 elegant-shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature bg-success bg-gradient text-white rounded-3 me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-heart-pulse-fill fs-4"></i>
                    </div>
                    <h4 className="mb-0">医疗器械</h4>
                  </div>
                  <p className="text-muted mb-3">医疗级塑料制品，满足无菌要求和生物相容性标准</p>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">骨科器械</span>
                      <span className="badge bg-light text-dark me-1 mb-1">内窥镜</span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">医疗耗材</span>
                      <span className="badge bg-light text-dark me-1 mb-1">诊断设备</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">无菌要求 · 生物相容性 · 精密制造</small>
                    <a href="#" className="btn btn-sm btn-outline-success">了解更多</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 电子电器 */}
            <div className="col-lg-6 mb-5">
              <div className="card h-100 elegant-shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature bg-warning bg-gradient text-white rounded-3 me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-lightning-charge-fill fs-4"></i>
                    </div>
                    <h4 className="mb-0">电子电器</h4>
                  </div>
                  <p className="text-muted mb-3">高精度电子电器塑料零部件，具备优异的绝缘性能和尺寸稳定性</p>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">PEI</span>
                      <span className="badge bg-light text-dark me-1 mb-1">PPS</span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">PA66</span>
                      <span className="badge bg-light text-dark me-1 mb-1">PC/ABS</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">绝缘性能 · 耐高温 · 尺寸稳定</small>
                    <a href="#" className="btn btn-sm btn-outline-warning">了解更多</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 工程塑料制品 */}
            <div className="col-lg-6 mb-5">
              <div className="card h-100 elegant-shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature bg-info bg-gradient text-white rounded-3 me-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-gear-fill fs-4"></i>
                    </div>
                    <h4 className="mb-0">工程塑料制品</h4>
                  </div>
                  <p className="text-muted mb-3">特种工程塑料制品，满足耐高温、耐腐蚀等特殊要求</p>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">耐高温</span>
                      <span className="badge bg-light text-dark me-1 mb-1">耐腐蚀</span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-light text-dark me-1 mb-1">透明功能</span>
                      <span className="badge bg-light text-dark me-1 mb-1">特种材料</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">特种材料 · 定制加工 · 品质保证</small>
                    <a href="#" className="btn btn-sm btn-outline-info">了解更多</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特种材料展示 */}
      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">🔬 特种材料专长</h2>
            <p className="lead fw-normal text-muted mb-0">我们专注于高性能特种塑料的加工与应用</p>
          </div>
          <div className="row gx-5 justify-content-center">
            {[
              { name: 'PEEK', description: '聚醚醚酮，耐高温、高强度、化学稳定性优异', features: ['耐温260°C', '高强度', '化学稳定'], color: 'primary' },
              { name: 'PEI', description: '聚醚酰亚胺，高温下保持优异机械性能', features: ['耐温180°C', '尺寸稳定', '电绝缘'], color: 'success' },
              { name: 'PPSU', description: '聚苯砜，透明、耐高温、生物相容性好', features: ['透明', '耐温180°C', '生物相容'], color: 'warning' },
              { name: 'PPS', description: '聚苯硫醚，耐化学腐蚀、尺寸稳定性好', features: ['耐腐蚀', '尺寸稳定', '阻燃'], color: 'info' },
              { name: 'PFA', description: '全氟烷氧基树脂，超强耐化学腐蚀性', features: ['超耐腐蚀', '低摩擦', '高纯度'], color: 'danger' },
              { name: 'TPE', description: '热塑性弹性体，柔软、弹性好、可回收', features: ['柔软', '弹性好', '可回收'], color: 'secondary' }
            ].map((material, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 elegant-shadow">
                  <div className="card-body text-center p-4">
                    <div className={`feature bg-${material.color} bg-gradient text-white rounded-3 mb-3 mx-auto`} style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <h3 className="mb-0 fw-bold">{material.name}</h3>
                    </div>
                    <h5 className="card-title mb-3">{material.name}</h5>
                    <p className="card-text text-muted mb-3">{material.description}</p>
                    <div className="mb-3">
                      {material.features.map((feature, fIdx) => (
                        <span key={fIdx} className={`badge bg-${material.color} bg-opacity-10 text-${material.color} me-1 mb-1`}>{feature}</span>
                      ))}
                    </div>
                    <a href="#" className={`btn btn-outline-${material.color}`}>了解详情</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 价格说明 */}
      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">💰 价格说明</h2>
            <p className="lead fw-normal text-muted mb-0">价格根据产品复杂度、材料要求、数量等因素进行调整</p>
          </div>
          <div className="row gx-5">
            <div className="col-lg-6">
              <h3 className="fw-bolder mb-4">影响价格的因素</h3>
              <div className="mb-3">
                <h6 className="fw-bold">材料选择：</h6>
                <p className="text-muted">PEEK、PEI等特种材料成本较高，普通工程塑料价格相对较低</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">产品复杂度：</h6>
                <p className="text-muted">结构复杂、精度要求高的产品，加工难度大，价格相应提高</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">生产数量：</h6>
                <p className="text-muted">批量生产可降低单位成本，数量越大价格越优惠</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">质量要求：</h6>
                <p className="text-muted">医疗级、汽车级等高标准要求，需要更严格的工艺控制</p>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="fw-bolder mb-4">我们的优势</h3>
              <div className="mb-3">
                <h6 className="fw-bold">技术优势：</h6>
                <p className="text-muted">拥有先进的加工设备和专业的技术团队，确保产品质量</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">成本控制：</h6>
                <p className="text-muted">规模化生产、供应链优化，为客户提供最具竞争力的价格</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">服务保障：</h6>
                <p className="text-muted">从设计到交付的一站式服务，减少客户沟通成本</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">质量承诺：</h6>
                <p className="text-muted">严格的质量管理体系，确保产品稳定性和可靠性</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 获取详细报价 */}
      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="text-center">
            <h2 className="fw-bolder gradient-text">📞 获取详细报价</h2>
            <p className="lead fw-normal text-muted mb-4">请联系我们的专业团队，为您提供个性化的解决方案和准确报价</p>
            <div className="row gx-5 justify-content-center mt-5">
              <div className="col-lg-8">
                <div className="row gx-5 text-center">
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">24小时</div>
                    <div className="text-muted">响应时间</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">免费</div>
                    <div className="text-muted">技术咨询</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">定制化</div>
                    <div className="text-muted">解决方案</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a className="btn btn-success btn-lg me-3" href="/contact">联系我们</a>
              <a className="btn btn-outline-success btn-lg" href="/about">了解更多</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 