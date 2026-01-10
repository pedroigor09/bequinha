# 🌟 Bequinha - Site Cinematográfico

Site premium desenvolvido para **Rebeca Lemos (Bequinha)**, influencer de lifestyle e maternidade de Salvador com +700k seguidores.

## ✨ Features

- 🎬 **Scroll Vertical Animado** - Seções que transitam com GSAP Observer
- 🎯 **Parallax Multi-layer** - Efeitos de profundidade estilo Rockstar Games/Nike  
- ✍️ **Text Animations** - Split text character por character com SplitType
- 🎨 **Transições Suaves** - Efeitos cinematográficos nas mudanças de seção
- 📱 **100% Responsivo** - Otimizado para mobile, tablet e desktop
- ⚡ **Performance** - SSR/SSC com Next.js 16
- 🖱️ **Controle Avançado** - Scroll, touch e teclado

## 🚀 Tecnologias

- **Next.js 16** - React Framework com App Router
- **TypeScript** - Type safety
- **GSAP + Observer** - Animações e controle de scroll
- **SplitType** - Animação de texto character por character  
- **Tailwind CSS 4** - Styling moderno
- **React 19** - Server Components

## 📦 Instalação

```bash
npm install
```

## 🏃‍♂️ Desenvolvimento

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Como Funciona

O site usa **GSAP Observer** para detectar gestos (scroll, touch, swipe) e transicionar entre seções verticais:

1. **Wrapper Duplo**: Cada seção tem `outer` e `inner` divs que animam em direções opostas
2. **Parallax nas Imagens**: Fundo se move em velocidade diferente criando profundidade
3. **Split Text**: Títulos e subtítulos animam character por character
4. **Stagger Animation**: Caracteres aparecem de forma aleatória

### Estrutura de uma Seção

```tsx
{
  id: 'hero',
  title: 'Rebeca Lemos',
  subtitle: 'Bequinha • Salvador, BA',
  image: '/hero-bequinha.jpg',
  placeholder: 'https://unsplash.com/...' // Fallback
}
```


## 🖼️ Imagens Necessárias

Veja o arquivo [IMAGES.md](IMAGES.md) para detalhes completos sobre as imagens necessárias.

## ⚙️ Customização

### Alterar Números das Stats

Edite o arquivo `src/components/Stats.tsx`:

```tsx
<StatItem value={704} suffix="K" label="Seguidores" />
```

### Alterar WhatsApp

Edite os arquivos:
- `src/components/WhatsAppButton.tsx`
- `src/components/Contact.tsx`

Substitua `5571999999999` pelo número real.

## 🎨 Animações de Alto Nível

- **Hero**: Split text character by character + parallax background
- **Stats**: Contadores animados que sobem ao scroll
- **Timeline**: Cards com entrada lateral + parallax nas imagens
- **Brands**: Scale up com bounce effect
- **Smooth Scroll**: Lenis para navegação premium

## 📱 100% Responsivo

Breakpoints otimizados para todas as telas.

## 🌐 Deploy

Deploy na Vercel com um clique ou qualquer plataforma Next.js.

---

**Desenvolvido com 💜 para Rebeca Lemos**

