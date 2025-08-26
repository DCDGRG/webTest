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
                <p className="text-muted">结构复杂、精度要求高的产品需要更精密的模具和工艺</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">生产数量：</h6>
                <p className="text-muted">大批量生产可享受规模效应，单位成本降低</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">质量要求：</h6>
                <p className="text-muted">医疗级、汽车级等高标准要求需要更严格的质量控制</p>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="fw-bolder mb-4">我们的优势</h3>
              <div className="mb-3">
                <h6 className="fw-bold">一站式服务：</h6>
                <p className="text-muted">从设计到交付，减少中间环节，降低成本</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">技术实力：</h6>
                <p className="text-muted">专业团队，先进设备，确保产品质量</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">质量保证：</h6>
                <p className="text-muted">ISO9001、IATF16949、ISO13485等质量认证</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">快速响应：</h6>
                <p className="text-muted">专业客服团队，快速响应客户需求</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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