import { UnitInfo, ServiceItem, FaqItem, InstagramPost } from '../types';

import logoImg from '../assets/images/prime_rodas_logo.svg';
import mascotImg from '../assets/images/mascot_logo_chest_1784936863841.jpg';
import storefrontImg from '../assets/images/fachada-prime-rodas.png';
import metallicWheelImg from '../assets/images/wheel_metallic_bg_1784935310642.jpg';
import beforeWheelImg from '../assets/images/wheel_before_restoration_1784935321072.jpg';
import afterWheelImg from '../assets/images/wheel_after_restoration_1784935331015.jpg';
import consultantAksonImg from '../assets/images/consultant_akson_1784937014198.jpg';
import consultantNetoImg from '../assets/images/consultant_neto_1784937026389.jpg';

export const ASSETS = {
  logo: logoImg,
  mascot: mascotImg,
  storefront: storefrontImg,
  metallicWheel: metallicWheelImg,
  beforeWheel: beforeWheelImg,
  afterWheel: afterWheelImg,
  consultantAkson: consultantAksonImg,
  consultantNeto: consultantNetoImg,
};

export const INITIAL_UNITS: UnitInfo[] = [
  {
    id: 'zona-sul',
    name: "Prime Rodas Zona Sul",
    address: "Av. Dão Silveira, 4000, Loja C, Candelária, Natal/RN",
    phone: "(84) 98793-6367",
    whatsapp: "5584987936367",
    openingHours: "Segunda a Sexta: 08h às 17h30 | Sábado: 08h às 12h",
    mapsUrl: "https://share.google/iTcrWvW35kOPz3piC",
    consultantName: "Akson",
    consultantTitle: "Loja da Zona Sul",
    consultantImage: consultantAksonImg,
  },
  {
    id: 'mor-gouveia',
    name: "Prime Rodas Mor Gouveia",
    address: "Av. Capitão-Mor Gouveia, 1230 - Cidade da Esperança, Natal/RN",
    phone: "(84) 98162-1968",
    whatsapp: "5584981621968",
    openingHours: "Segunda a Sexta: 08h às 17h30 | Sábado: 08h às 12h",
    mapsUrl: "https://maps.google.com/?q=Prime+Rodas+Mor+Gouveia+Natal",
    consultantName: "Neto",
    consultantTitle: "Loja da Mor Gouveia",
    consultantImage: consultantNetoImg,
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  // RODAS (01 - 07)
  {
    id: '01',
    number: '01',
    title: 'Recuperação e revitalização de rodas',
    category: 'Rodas',
    description: 'Renovação estética e recuperação do acabamento de rodas de liga leve.',
    detailedInfo: 'Restauração completa de imperfeições superficiais, arranhões de meio-fio e desgaste do tempo em rodas de liga leve, devolvendo a aparência original de zero km com tinta e verniz de alto padrão.',
    iconName: 'Sparkles'
  },
  {
    id: '02',
    number: '02',
    title: 'Desempeno de rodas',
    category: 'Rodas',
    description: 'Correção técnica de rodas empenadas para melhorar estabilidade e segurança.',
    detailedInfo: 'Utilizamos torno hidráulico computadorizado para corrigir deformações e empenos causados por buracos e impactos, garantindo rolamento perfeito sem comprometer a estrutura da roda.',
    iconName: 'Compass'
  },
  {
    id: '03',
    number: '03',
    title: 'Solda em rodas trincadas',
    category: 'Rodas',
    description: 'Avaliação e reparo profissional de trincas em rodas automotivas.',
    detailedInfo: 'Aplicação de solda TIG especializada em alumínio com preparação de trinca, penetração total e reforço estrutural, seguido de acabamento usinado rigoroso.',
    iconName: 'Flame'
  },
  {
    id: '04',
    number: '04',
    title: 'Pintura de rodas',
    category: 'Rodas',
    description: 'Renovação e personalização do acabamento das rodas.',
    detailedInfo: 'Pintura eletrostática a pó ou curada em estufa, resistente a altas temperaturas e atrito de freio. Várias cores disponíveis como preto brilhante, preto fosco, grafite, hyper silver e bronze.',
    iconName: 'Palette'
  },
  {
    id: '05',
    number: '05',
    title: 'Diamantação e copiação',
    category: 'Rodas',
    description: 'Recuperação do acabamento diamantado, devolvendo brilho e aparência renovada.',
    detailedInfo: 'Processo usinado com ponta de diamante industrial que recria o corte espelhado original da face da roda com precisão micrométrica e aplicação de verniz ultra resistente.',
    iconName: 'Gem'
  },
  {
    id: '06',
    number: '06',
    title: 'Personalização de rodas',
    category: 'Rodas',
    description: 'Cores e acabamentos personalizados de acordo com o estilo do cliente.',
    detailedInfo: 'Customizações exclusivas para veículos esportivos e executivos, incluindo pintura bicolores, detalhes em vermelho Prime, logotipos customizados e efeitos especiais.',
    iconName: 'Sliders'
  },
  {
    id: '07',
    number: '07',
    title: 'Rodas de liga leve',
    category: 'Rodas',
    description: 'Opções de rodas para diferentes modelos e estilos de veículos.',
    detailedInfo: 'Consultoria e fornecimento de novos jogos de rodas de liga leve de grandes marcas do mercado nacional e importados dos aros 14 ao 22.',
    iconName: 'Disc'
  },

  // PNEUS (08 - 10)
  {
    id: '08',
    number: '08',
    title: 'Pneus novos',
    category: 'Pneus',
    description: 'Venda e instalação de pneus de diferentes marcas e medidas.',
    detailedInfo: 'Catálogo completo de pneus de passeio, SUVs, utilitários e alta performance (Michelin, Pirelli, Bridgestone, Continental, Goodyear e mais) com garantia de fábrica.',
    iconName: 'CircleDot'
  },
  {
    id: '09',
    number: '09',
    title: 'Pneus seminovos',
    category: 'Pneus',
    description: 'Opções selecionadas para quem procura economia e qualidade.',
    detailedInfo: 'Pneus rigorosamente inspecionados por nossa equipe técnica, com borracha de boa profundidade de sulco, sem bolhas ou deformações estruturais.',
    iconName: 'CheckCircle2'
  },
  {
    id: '10',
    number: '10',
    title: 'Montagem de pneus',
    category: 'Pneus',
    description: 'Instalação profissional, seguindo os cuidados adequados para cada roda.',
    detailedInfo: 'Montagem com desmontadoras de braço robótico anti-risco para proteção total das bordas da roda e troca de válvulas/bicos.',
    iconName: 'Wrench'
  },

  // CENTRO AUTOMOTIVO (11 - 16)
  {
    id: '11',
    number: '11',
    title: 'Alinhamento de direção',
    category: 'Centro automotivo',
    description: 'Alinhamento computadorizado para melhorar a dirigibilidade e preservar os pneus.',
    detailedInfo: 'Alinhamento 3D de alta precisão que ajusta o esterço das rodas de acordo com as especificações da montadora, evitando desgaste irregular dos pneus.',
    iconName: 'Target'
  },
  {
    id: '12',
    number: '12',
    title: 'Balanceamento',
    category: 'Centro automotivo',
    description: 'Redução de vibrações e maior conforto durante a condução.',
    detailedInfo: 'Balanceamento dinâmico e estático computadorizado para eliminar trepidações no volante e no assoalho do veículo em médias e altas velocidades.',
    iconName: 'Gauge'
  },
  {
    id: '13',
    number: '13',
    title: 'Suspensão',
    category: 'Centro automotivo',
    description: 'Avaliação e manutenção de componentes do sistema de suspensão.',
    detailedInfo: 'Diagnóstico e substituição de amortecedores, molas, buchas, pivôs, bieletas e coifas para estabilidade máxima do veículo.',
    iconName: 'Activity'
  },
  {
    id: '14',
    number: '14',
    title: 'Freios',
    category: 'Centro automotivo',
    description: 'Inspeção e manutenção do sistema de frenagem.',
    detailedInfo: 'Troca de pastilhas, discos, fluido de freio, lonas e retífica de discos de freio para desaceleração eficiente e segura.',
    iconName: 'ShieldAlert'
  },
  {
    id: '15',
    number: '15',
    title: 'Troca de óleo e filtros',
    category: 'Centro automotivo',
    description: 'Manutenção do óleo do motor e substituição dos filtros necessários.',
    detailedInfo: 'Lubrificantes sintéticos e semissintéticos homologados pelas fabricantes com substituição preventiva dos filtros de óleo, ar, combustível e ar-condicionado.',
    iconName: 'Droplet'
  },
  {
    id: '16',
    number: '16',
    title: 'Manutenção preventiva',
    category: 'Centro automotivo',
    description: 'Avaliação de componentes importantes para ajudar a evitar falhas inesperadas.',
    detailedInfo: 'Checklist completo de mais de 30 itens de segurança (bateria, iluminação, correias, arrefecimento e suspensão) antes de viagens ou revisões periódicas.',
    iconName: 'ShieldCheck'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "A Prime Rodas recupera rodas trincadas?",
    answer: "Sim! Realizamos a avaliação técnica e o reparo profissional de trincas através de solda TIG especializada. As condições e viabilidade do conserto devem ser confirmadas diretamente com a equipe técnica da Prime Rodas após inspeção presencial."
  },
  {
    question: "É possível corrigir uma roda empenada?",
    answer: "Com certeza. Utilizamos equipamentos de desempeno hidráulico automatizados que reestabelecem a geometria circular da roda, eliminando vibrações na rodagem."
  },
  {
    question: "Vocês fazem pintura e personalização?",
    answer: "Sim. Oferecemos pintura completa com preparação química, aplicação de primer especial, tinta de alta resistência e verniz importado, em diversas cores e acabamentos como preto cadillac, grafite fosco, bronze e ouro."
  },
  {
    question: "Qual a diferença entre pintura e diamantação?",
    answer: "A pintura cobre toda a superfície com cor uniforme. A diamantação utiliza um torno com ponta de diamante para cortar a face da roda, deixando um efeito espelhado metálico característico das rodas originais mais modernas."
  },
  {
    question: "Vocês vendem rodas e pneus?",
    answer: "Sim! Dispomos de um catálogo com pneus novos de diversas marcas renomadas, pneus seminovos rigorosamente testados e opções de jogos de rodas de liga leve."
  },
  {
    question: "Preciso agendar o atendimento?",
    answer: "Atendemos por ordem de chegada e também por agendamento prévio via WhatsApp para maior conveniência do seu tempo."
  },
  {
    question: "Como escolher a unidade?",
    answer: "Temos duas unidades em Natal: Mor Gouveia e Zona Sul (Candelária). Escolha a mais conveniente para sua localização ao entrar em contato via WhatsApp."
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartões de crédito e débito com parcelamento em até 10x, PIX e dinheiro. As condições devem ser confirmadas diretamente com a equipe da Prime Rodas."
  },
  {
    question: "O orçamento pode ser solicitado pelo WhatsApp?",
    answer: "Sim! Você pode enviar fotos e vídeos das suas rodas ou informar o serviço desejado pelo WhatsApp para receber uma estimativa inicial e orientação dos nossos consultores."
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    caption: 'Transformação incrível de jogo de rodas com diamantação e pintura preto piano! ✨🚗',
    likes: 342
  },
  {
    id: 'post-2',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    caption: 'Alinhamento 3D de precisão na unidade Zona Sul. Segurança em 1º lugar!',
    likes: 219
  },
  {
    id: 'post-3',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
    caption: 'Restauração e reparo de solda TIG com garantia de acabamento original.',
    likes: 418
  },
  {
    id: 'post-4',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    caption: 'Montagem de pneus de alta performance para SUV executivo.',
    likes: 185
  },
  {
    id: 'post-5',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    caption: 'Mais um cliente satisfeito com as rodas renovadas na Prime Rodas Natal.',
    likes: 512
  },
  {
    id: 'post-6',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    caption: 'Atendimento técnico humanizado e café quentinho esperando por você nas nossas lojas.',
    likes: 289
  }
];
