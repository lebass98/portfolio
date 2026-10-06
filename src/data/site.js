// 메인 페이지 섹션 문구와 구성
// 두 톤 문구 규칙: { t: '텍스트', m: true } = 흐린 색(muted), { t, a: true } = 강조색(accent)
import { portfolio, values } from './portfolio'

const byId = (id) => portfolio.projects.find((p) => p.id === id)
const img = (file) => `/images/portfolio/${file}`

export const brand = {
  wordmark: 'JKLEE',
  name: portfolio.profile.name,
  since: 2004,
  email: portfolio.profile.email,
  phone: portfolio.profile.phone,
  location: 'Seoul, Korea',
  company: '워드앤코드 (WordNcode)',
  // 히어로 배경 영상 경로. 라이선스가 있는 영상을 public/videos에 넣고 경로를 적으면 셰이더 대신 영상이 재생됩니다.
  heroVideo: null,
}

export const YEAR = new Date().getFullYear()
export const years = YEAR - brand.since

export const links = {
  portfolio: 'https://lebass98.github.io/Portfolio_2026/',
  github: 'https://github.com/lebass98',
}

// 외부 링크(사이트 보기) 주소 정리
export const projectUrl = (p) => {
  if (!p.url || p.url === '#') return null
  if (p.url.startsWith('/')) return `${links.portfolio.replace(/\/$/, '')}${p.url}`
  return p.url
}

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Career', href: '#career' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  title: [{ t: '디자인과 코드의', a: true }, { t: ' 경계를 허무는 퍼블리셔' }],
  sub: '디자인의 감각과 퍼블리싱의 기술을 잇는 20년 차 베테랑, UI/UX 디자이너 겸 퍼블리셔 이재광입니다.',
  thumbs: [byId(12), byId(25), byId(27), byId(4)],
  badge: { value: `${portfolio.projects.length}+`, lines: ['PROJECTS FOR', 'PUBLIC & BRANDS'] },
  ctaLabel: 'Have a project in mind?',
  cta: '프로젝트 문의하기',
}

const publishedAll = portfolio.projects.filter((p) => p.contribution.publishing === 100).length
const publishShare = Math.round((publishedAll / portfolio.projects.length) * 100)

export const about = {
  label: 'Who I am',
  title: [{ t: '20년째', m: true }, { t: ' 화면과 코드를 잇습니다' }],
  desc: '웹 디자이너로 시작해 퍼블리셔로 전향했고, 지금은 공공기관 전문 웹 에이전시를 이끌고 있습니다.',
  quote: [
    { t: '좋은 화면은 디자인에서 시작되지만,', m: true },
    { t: ' 완성은 코드에서 이루어집니다' },
    { t: '. 그 사이의 간극을 없애는 것이', m: true },
    { t: ' 제 일입니다' },
    { t: '.', m: true },
  ],
  person: { name: portfolio.profile.name, role: 'Founder, WordNcode' },
  clients: [
    '동희홀딩스', '고용노동부', '인천공항시설관리', '한국미우라공업사', '경북대학교',
    '문화재수리협회', '지위픽 코리아', '한국의 서원', '코넥스 협회', 'KCVS',
  ],
  ctaLabel: 'Two decades of practice',
  cta: '경력 살펴보기',
  stats: [
    { label: 'Years of Experience', value: years, suffix: '+', desc: '2004년부터 이어온\n웹 디자인과 퍼블리싱' },
    { label: 'Selected Projects', value: portfolio.projects.length, suffix: '+', desc: '공공기관부터\n브랜드 쇼핑몰까지' },
    { label: 'Companies', value: portfolio.experience.length, suffix: '', desc: '에이전시와 인하우스를\n두루 거친 경력' },
    { label: 'Hand-coded Publishing', value: publishShare, suffix: '%', desc: '참여 프로젝트의 퍼블리싱을\n직접 맡은 비율' },
  ],
}

export const why = {
  label: 'Why me',
  title: [{ t: '디자이너의 눈과', m: true }, { t: ' 개발자의 손' }],
  desc: '보기 좋은 결과물을 넘어, 운영하기 쉽고 오래 쓰이는 사이트를 만듭니다.',
  fill: '좋은 웹사이트는 보기 좋은 화면을 넘어 누구나 쉽게 쓰고 오래 관리할 수 있어야 합니다. 그래서 디자인 단계부터 마크업을 생각하고, 코드 한 줄에도 그 화면을 쓸 사람을 떠올립니다.',
  big: {
    title: [{ t: '설계부터', a: true }, { t: ' 구현까지 한 번에' }],
    desc: '기획 의도를 가장 잘 아는 사람이 직접 코드로 옮기기에, 시안과 결과물 사이에 차이가 없습니다.',
    list: ['웹 표준', '웹 접근성', '반응형 웹'],
    value: publishShare,
    caption: 'Hand-coded publishing',
  },
  mint: { title: 'Design × Code', desc: '두 언어를 모두 다루기에 가능한 결과물을 만듭니다.', words: ['DESIGN', 'CODE'] },
  tile: { title: '디테일이 신뢰를 만듭니다', desc: '픽셀 하나, 여백 하나까지\n끝까지 맞춥니다.', image: img('scr_04.jpg') },
  bars: { title: '쌓여온 시간' },
  tiles: { title: '구조 먼저, 장식은 나중' },
}

export const services = {
  label: 'Services',
  title: [{ t: '잘하는 일,', a: true }, { t: ' 오래 해온 일' }],
  desc: '기획과 디자인, 퍼블리싱과 프론트엔드까지 웹사이트 제작의 전 과정을 다룹니다.',
  items: [
    { title: 'UI/UX 디자인', body: '정보 구조 설계부터 화면 설계, 디자인 시스템까지 사용자가 길을 잃지 않는 경험을 설계합니다.', image: img('scr_13.jpg') },
    { title: '웹 디자인', body: '브랜드의 톤앤매너를 정립하고, 첫 화면에서 핵심이 읽히는 시각적 위계를 만듭니다.', image: img('scr_08.jpg') },
    { title: '웹 퍼블리싱', body: '웹 표준을 지키는 견고한 마크업으로 어떤 브라우저에서도 같은 화면을 보여줍니다.', image: img('scr_11.jpg') },
    { title: '프론트엔드 개발', body: 'React와 Vite 기반으로 인터랙티브한 UI를 구현하고, 확장하기 쉬운 구조를 설계합니다.', image: img('scr_18.jpg') },
    { title: '웹 접근성', body: '누구나 이용할 수 있도록 접근성 지침과 KRDS 기준에 맞춰 화면과 코드를 다듬습니다.', image: img('scr_17.jpg') },
    { title: '반응형 웹', body: 'PC, 태블릿, 모바일 어디서나 핵심 콘텐츠가 자연스럽게 읽히도록 레이아웃을 설계합니다.', image: img('scr_19.jpg') },
    { title: '쇼핑몰 구축', body: '카페24 등 솔루션 스킨을 커스텀해 브랜드에 맞는 쇼핑 경험을 만듭니다.', image: img('scr_26.jpg') },
    { title: '다국어 사이트', body: '여러 언어와 지역을 고려한 구조로 글로벌 사이트를 구축합니다.', image: img('scr_09.jpg') },
    { title: '유지보수 · 리뉴얼', body: '운영 중인 사이트의 개선점을 찾아 단계적으로 고도화하고 리뉴얼합니다.', image: img('scr_21.jpg') },
  ],
  quote: [
    { t: '좋은 방식이', m: true },
    { t: ' 좋은 결과를 만듭니다' },
    { t: '. 그래서 작은 문제도', m: true },
    { t: ' 함께 질문하고 끝까지 검증합니다' },
    { t: '.', m: true },
  ],
  ctaLabel: 'Start a project',
  cta: '프로젝트 문의',
}

export const process = {
  label: 'Process',
  title: [{ t: '체계적인 과정,', m: true }, { t: ' 예측 가능한 결과' }],
  desc: '단계마다 결과를 공유하며 진행하기에 일정과 품질을 함께 지킬 수 있습니다.',
  steps: [
    { name: 'Discover', body: '목표와 사용자, 운영 환경을 먼저 파악하고 사이트가 해결해야 할 문제를 정의합니다.', outcome: '명확한 요구사항과 정보 구조' },
    { name: 'Design', body: '정보 구조를 화면으로 옮기고, 브랜드에 맞는 디자인 시스템을 만듭니다.', outcome: '확정된 화면 설계와 디자인 시안' },
    { name: 'Build', body: '웹 표준과 접근성을 지키는 마크업으로 디자인을 정확하게 구현합니다.', outcome: '반응형으로 완성된 퍼블리싱 결과물' },
    { name: 'Launch', body: '브라우저와 기기별 검수를 마친 뒤 오픈하고, 안정화까지 함께합니다.', outcome: '안정적인 오픈과 운영 가이드' },
  ],
  valuesLabel: 'How I work',
  values: values.slice(0, 3),
}

export const projects = {
  label: 'Featured projects',
  title: [{ t: '직접 그리고', m: true }, { t: ' 직접 만든 작업' }],
  desc: '공공기관, 중견기업, 커머스까지 디자인과 퍼블리싱을 맡은 대표 작업입니다.',
  quote: [
    { t: '화면 설계부터 마지막 마크업까지', m: true },
    { t: ' 한 사람이 책임지기에' },
    { t: ',', m: true },
    { t: ' 결과물의 완성도가 달라집니다' },
    { t: '.', m: true },
  ],
  stats: [
    { label: 'Projects', value: `${portfolio.projects.length}` },
    { label: 'Companies', value: `${portfolio.experience.length}` },
    { label: 'Public sector', value: `${portfolio.projects.filter((p) => p.tags.includes('Public')).length}` },
    { label: 'Years', value: `${years}+` },
  ],
  featured: [
    { ...byId(1), image: img('scr_01.jpg') },
    {
      ...byId(2),
      image: img('scr_03.jpg'),
      long: '유네스코 세계유산으로 등재된 9개 서원의 역사적 가치와 정보를 직관적으로 이해할 수 있도록 UI/UX 전반을 리뉴얼한 프로젝트입니다.',
    },
    { ...byId(5), image: img('scr_02.jpg') },
    { ...byId(8), image: img('scr_24.jpg') },
  ],
  others: [byId(7), byId(6), byId(10), byId(4)],
  ctaLabel: 'See the full archive',
  cta: '전체 포트폴리오',
}

export const career = {
  label: 'Career',
  title: [{ t: '20년의 경력이', m: true }, { t: ' 말해주는 것' }],
  desc: '에이전시와 인하우스를 오가며 쌓은 경험이 지금의 작업 방식이 되었습니다.',
  marqueeLabel: 'Projects across industries:',
}

export const roles = {
  label: 'Roles',
  title: [{ t: '한 사람,', m: true }, { t: ' 네 가지 역할' }],
  desc: '디자인과 개발을 오가는 네 가지 역할을 한 흐름으로 이어 결과물의 빈틈을 줄입니다.',
  cards: [
    { name: 'UI/UX Designer', skills: 'IA · Wireframe · System', image: img('scr_10.jpg') },
    { name: 'Web Designer', skills: 'Branding · Layout · Visual', image: img('scr_25.jpg') },
    { name: 'Frontend Developer', skills: 'React · Vite · Tailwind', image: img('scr_16.jpg') },
    { name: 'Web Publisher', skills: 'HTML · CSS · A11y', image: img('scr_12.jpg') },
  ],
  sentence: [{ t: '역할의 경계가 없기에', m: true }, { t: ' 결과물에 빈틈이 없습니다' }, { t: '.', m: true }],
  ctaLabel: 'Work with me',
  cta: '함께 작업하기',
}

export const engage = {
  label: 'Engagement',
  title: [{ t: '협업', a: true }, { t: ' 방식' }],
  desc: '새 사이트 제작부터 운영 중인 사이트의 유지보수까지, 필요에 맞게 함께합니다.',
  plans: {
    project: {
      tab: 'Project',
      value: 'One-stop',
      unit: '/design → code',
      list: ['기획 · 디자인 · 퍼블리싱 원스톱 진행', '웹 표준 · 웹 접근성을 지킨 마크업', 'PC · 태블릿 · 모바일 반응형 대응', '단계별 결과물 공유와 피드백', '오픈 후 안정화 지원'],
      note: ['For public sector, enterprises,', 'and brands planning a new', 'site or a full renewal.'],
      meta: 'Scope: New / Renewal',
    },
    care: {
      tab: 'Maintenance',
      value: 'Monthly',
      unit: '/care plan',
      list: ['콘텐츠 · 배너 정기 업데이트', '기능 개선과 UI 고도화', '접근성 · 브라우저 호환성 점검', '수정 요청 빠른 대응', '월간 작업 내역 정리'],
      note: ['For teams running a live site', 'who need a steady hand on', 'updates and improvements.'],
      meta: 'Scope: Ongoing',
    },
  },
  custom: {
    title: '맞춤 협업',
    body: '디자인만, 퍼블리싱만, 혹은 기존 팀과의 협업까지. 프로젝트 상황에 맞춰 범위와 방식을 함께 정합니다.',
  },
  summary: ['Project     → New sites & renewals', 'Maintenance → Ongoing care', 'Custom      → Flexible scope', '', 'Every engagement starts with a talk.'],
  ctaLabel: 'Start with a conversation',
  cta: '상담 요청하기',
}

export const faq = {
  label: 'FAQ',
  title: [{ t: '자주 묻는 질문,', m: true }, { t: ' 솔직한 답변' }],
  desc: '프로젝트를 시작하기 전에 많이 물어보시는 내용을 모았습니다.',
  groups: [
    {
      name: '협업 방식',
      items: [
        { q: '프로젝트는 어떻게 시작하나요?', a: '목표와 일정, 필요한 범위를 듣는 첫 미팅으로 시작합니다. 이후 정보 구조와 일정을 정리해 공유드리고 본격적으로 진행합니다.' },
        { q: '디자인이나 퍼블리싱만 따로 맡길 수 있나요?', a: '네, 가능합니다. 디자인만, 퍼블리싱만, 혹은 기존 개발팀과 협업하는 형태 모두 진행해왔습니다.' },
        { q: '공공기관 프로젝트 경험이 있나요?', a: '고용노동부 일생활균형, 인천공항시설관리, 세계유산 한국의 서원 통합관리센터 등 공공 분야 사이트를 디자인하고 퍼블리싱했습니다.' },
      ],
    },
    {
      name: '범위와 비용',
      items: [
        { q: '견적은 어떻게 산정되나요?', a: '페이지 수와 기능 범위, 일정에 따라 산정합니다. 첫 미팅에서 범위를 정리한 뒤 상세 견적을 드립니다.' },
        { q: '오픈 이후 유지보수도 가능한가요?', a: '네. 콘텐츠 업데이트부터 기능 개선, 리뉴얼까지 운영 중인 사이트를 꾸준히 관리합니다.' },
        { q: '작업 기간은 얼마나 걸리나요?', a: '사이트 규모와 기능에 따라 달라집니다. 일정은 첫 미팅에서 우선순위와 함께 정합니다.' },
      ],
    },
    {
      name: '기술과 산출물',
      items: [
        { q: '어떤 기술을 사용하나요?', a: 'HTML5, CSS3(SCSS), JavaScript, jQuery를 기본으로 하고, 필요에 따라 React, Vite, Tailwind CSS로 구현합니다.' },
        { q: '웹 접근성과 KRDS 기준을 지원하나요?', a: '웹 표준과 접근성을 기본으로 마크업하며, KRDS(범정부 UI/UX 디자인 시스템) 기반 작업 경험이 있습니다.' },
        { q: '카페24 같은 솔루션 커스텀도 되나요?', a: '네. NUTTY BUD, 네일마트 등 카페24 기반 쇼핑몰의 스킨 커스텀을 진행했습니다.' },
      ],
    },
  ],
  ctaNote: ['Still have questions?', 'Feel free to reach out anytime.', "I'll answer as clearly as I can."],
  ctaLabel: "Let's talk it over",
  cta: '문의하기',
}

export const contact = {
  label: 'Contact',
  title: [{ t: '함께 만들', m: true }, { t: ' 다음 프로젝트' }],
  desc: '목표와 일정, 고민을 알려주시면 검토 후 다음 단계를 안내해드리겠습니다.',
  quote: [
    { t: '좋은 프로젝트는', m: true },
    { t: ' 좋은 대화에서 시작됩니다' },
    { t: '. 지금 고민을', m: true },
    { t: ' 편하게 들려주세요' },
    { t: '.', m: true },
  ],
  services: ['UI/UX 디자인', '웹 디자인', '웹 퍼블리싱', '프론트엔드 개발', '웹 접근성', '반응형 웹', '쇼핑몰 구축', '다국어 사이트', '유지보수', '리뉴얼', '랜딩 페이지', '기타'],
  budgets: ['아직 정하지 않았어요', '1천만 원 미만', '1천만 ~ 3천만 원', '3천만 원 이상'],
  submit: '문의 보내기',
}

export const archive = {
  label: 'Archive',
  title: [{ t: '더 많은', m: true }, { t: ' 작업들' }],
  desc: '업종과 규모는 달라도, 모든 작업에 같은 기준을 적용했습니다.',
  items: [byId(23), byId(22), byId(26), byId(19)],
  sentence: [{ t: '모든 작업은', m: true }, { t: ' 같은 기준으로 만듭니다' }, { t: '.', m: true }],
  ctaLabel: 'More works on the archive',
  cta: '전체 작업 보기',
}

export const quick = {
  label: 'Quick contact',
  title: [{ t: '짧게 남기면', m: true }, { t: ' 먼저 연락드릴게요' }],
  desc: '이메일 주소만 남겨주셔도 됩니다. 프로젝트에 대해 편하게 이야기 나눠요.',
  note: 'Your email stays with me only.',
  cta: '연락받기',
}

export const footer = {
  statement: [
    { t: '화려함보다', m: true },
    { t: ' 명확함을' },
    { t: ', 장식보다', m: true },
    { t: ' 구조를' },
    { t: ' 먼저 생각합니다', m: true },
    { t: '.', m: true },
  ],
  info: ['UI/UX Designer & Web Publisher', `Based in ${brand.location}`],
  social: [
    { label: 'Portfolio 2026', href: links.portfolio },
    { label: 'GitHub', href: links.github },
    { label: 'Email', href: `mailto:${brand.email}` },
  ],
  more: [
    { label: brand.company, href: null },
    { label: `Since ${brand.since}`, href: null },
  ],
}
