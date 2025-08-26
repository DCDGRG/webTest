export default function About() {
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
                <h1 className="fw-bolder mb-3 text-white">上海奎星电子科技有限公司</h1>
                <p className="lead fw-normal text-white mb-4">位于上海宝山区，专业从事精密模具设计制造、注塑成型及喷涂、印刷、移印、烫金、组装等一条龙服务。专注于高性能特种塑料制品的定制加工，广泛应用于分析仪器、医疗器械、汽车零部件、传感器、智能家居等领域。</p>
                <a className="btn btn-success btn-lg" href="#company-intro">了解更多</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 light-teal-bg" id="company-intro">
        <div className="container px-5 my-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src="https://dummyimage.com/600x400/343a40/6c757d" alt="企业理念" /></div>
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">💡 企业理念</h2>
              <div className="mb-3">
                <h5 className="fw-bold">方针：</h5>
                <p className="text-muted">服务百分百，质量零缺陷</p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold">精神：</h5>
                <p className="text-muted">专业 · 诚信 · 开拓 · 创新</p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold">宗旨：</h5>
                <p className="text-muted">人人品管、过程受控、质量稳定、客户满意</p>
              </div>
              <div className="mb-3">
                <h5 className="fw-bold">目标：</h5>
                <p className="text-muted">不断提升竞争力、凝聚力与创新力，为客户与社会创造更大价值</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container px-5 my-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6 order-first order-lg-last"><img className="img-fluid rounded mb-5 mb-lg-0" src="https://dummyimage.com/600x400/343a40/6c757d" alt="设备与车间" /></div>
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">⚙️ 设备与车间</h2>
              <p className="lead fw-normal text-muted mb-4">公司拥有先进的生产与检测设备，确保产品精度与品质。</p>
              <div className="mb-3">
                <h6 className="fw-bold">模具部：</h6>
                <p className="text-muted">CNC 加工中心、沙迪克火花机、磨床、钻床等 20+ 台</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">注塑部：</h6>
                <p className="text-muted">31 台注塑机（50T–800T，包括双色、立式、薄壁高速机）</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">喷漆部：</h6>
                <p className="text-muted">10 万级无尘喷漆车间，自动喷漆与 UV 流水线</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">组装车间：</h6>
                <p className="text-muted">丝印、移印、烫金、超声波焊接等设备</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">检测设备：</h6>
                <p className="text-muted">三坐标测量仪、二次元影像仪、色差仪、摩擦测试仪等</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">医疗配件车间：</h6>
                <p className="text-muted">10万级无尘医疗配件注塑车间，满足高端医疗产品要求</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder gradient-text">🛠 产品与应用领域</h2>
            <p className="lead fw-normal text-muted mb-5">我们为多个行业提供高性能塑料零部件</p>
          </div>
          <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
            {[
              { 
                icon: '🚗', 
                title: '汽车零部件', 
                description: 'PBT-GF30、PPSU、PFA、PA66 等材料产品',
                features: ['高强度', '耐腐蚀', '轻量化']
              },
              { 
                icon: '🏥', 
                title: '医疗器械', 
                description: '骨科器械、内窥镜手柄、医疗耗材',
                features: ['生物相容性', '无菌要求', '精密制造']
              },
              { 
                icon: '⚡', 
                title: '电子电器', 
                description: 'PEI、PPS、PA66 等高强度、耐腐蚀零部件',
                features: ['绝缘性能', '耐高温', '尺寸稳定']
              },
              { 
                icon: '🔬', 
                title: '工程塑料', 
                description: '耐高温、耐腐蚀、透明功能材料产品',
                features: ['特种材料', '定制加工', '品质保证']
              },
            ].map((product, idx) => (
              <div key={idx} className="col mb-5 mb-5 mb-xl-0">
                <div className="text-center elegant-shadow p-3 rounded">
                  <div className="display-4 mb-3">{product.icon}</div>
                  <h5 className="fw-bolder">{product.title}</h5>
                  <p className="text-muted mb-3">{product.description}</p>
                  <div className="small">
                    {product.features.map((feature, fIdx) => (
                      <span key={fIdx} className="badge bg-success me-1 mb-1">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">🏅 质量与资质</h2>
              <p className="lead fw-normal text-muted mb-4">公司建立了完善的质量体系和标准化流程</p>
              <div className="mb-3">
                <h6 className="fw-bold">质量认证：</h6>
                <p className="text-muted">ISO9001、IATF16949:2016、ISO13485</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">专业资质：</h6>
                <p className="text-muted">10万级无尘注塑车间</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">模具分析流程：</h6>
                <p className="text-muted">3D 数据确认 → 模流与结构分析 → 改进建议 → 客户确认 → 模具制造 → 产品交付</p>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bolder gradient-text">🌍 客户与市场</h2>
              <p className="lead fw-normal text-muted mb-4">服务全球客户，建立长期合作关系</p>
              <div className="mb-3">
                <h6 className="fw-bold">服务地区：</h6>
                <p className="text-muted">中国、美国、欧洲、亚洲等地区</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">服务行业：</h6>
                <p className="text-muted">医疗健康、汽车、电子电器、智能家居、分析仪器等</p>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">材料专长：</h6>
                <p className="text-muted">PEEK、PEI、PPSU、PPS、PFA、TPE、PC/ABS、PA12、PC 等高性能特种塑料</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 light-teal-bg">
        <div className="container px-5 my-5">
          <div className="text-center">
            <h2 className="fw-bolder gradient-text">🤝 我们的承诺</h2>
            <p className="lead fw-normal text-muted mb-4">我们将继续秉持"专业、诚信、开拓、创新"的精神，不断优化技术与管理，以高质量的产品和优质的服务，与全球客户携手合作，共创双赢。</p>
            <div className="row gx-5 justify-content-center mt-5">
              <div className="col-lg-8">
                <div className="row gx-5 text-center">
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">20+</div>
                    <div className="text-muted">模具设备</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">31</div>
                    <div className="text-muted">注塑机台</div>
                  </div>
                  <div className="col-4">
                    <div className="h3 fw-bold text-success">10万级</div>
                    <div className="text-muted">无尘车间</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 