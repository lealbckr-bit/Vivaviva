"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Minus, Plus, Trophy } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  // Estados para controlar as quantidades de cada card
  const [quantities, setQuantities] = useState({
    card1: 20, // Card do vídeo hero
    card2: 20, // Card roxo 500 MIL
    card3: 40, // Card azul 3 MIL (começa em 40)
    card4: 20  // Card amarelo 10 MIL
  })

  // Valores permitidos para cada card
  const allowedValuesCard1 = [20, 40, 60, 80, 100, 200]
  const allowedValuesCard2 = [20, 40, 60, 80, 100, 200]
  const allowedValuesCard3 = [40, 60, 80, 100, 140, 200]
  const allowedValuesCard4 = [20, 40, 60, 80, 100, 200]
  
  const priceMultiplier = 0.55

  // URLs de checkout para cada card e quantidade
  // Agora card2 = primeiro card (roxo), card3 = segundo card (azul)
  const checkoutUrls = {
    card2: {
      20: "https://pay.pague-seguro.shop/checkout/e706e364-1826-4015-ba66-1729e12e4139",
      40: "https://pay.pague-seguro.shop/checkout/fdee7871-2ee9-4eac-95f2-206d393c2821",
      60: "https://pay.pague-seguro.shop/checkout/2f13311a-b390-432f-8757-526403b2bc0c",
      80: "https://pay.pague-seguro.shop/checkout/1bd66acb-f8d7-47e6-83e1-6bb5298ea23c",
      100: "https://pay.pague-seguro.shop/checkout/762072af-7346-4082-8197-b3b3e2f24dd1",
      200: "https://pay.pague-seguro.shop/checkout/f3adcd2f-4ca1-453b-9fa0-99353be19518"
    },
    card3: {
      40: "https://pay.pague-seguro.shop/checkout/ba4f0186-fc6f-4053-8549-2d8c779be7c6",
      60: "https://pay.pague-seguro.shop/checkout/70534ade-c5fd-4ec0-8abe-2bd260ec6a72",
      80: "https://pay.pague-seguro.shop/checkout/820f0266-4b90-49a9-92d3-a1226c5fa3ba",
      100: "https://pay.pague-seguro.shop/checkout/31b8e75c-2d26-4456-a603-c1be9c46ba67",
      140: "https://pay.pague-seguro.shop/checkout/d6dea6a8-20df-4997-bf81-831d7289cd9a",
      200: "https://pay.pague-seguro.shop/checkout/a85be555-453e-48d7-b042-13635d8d4c49"
    }
  }

  // Função para obter valores permitidos por card
  const getAllowedValues = (cardId: keyof typeof quantities) => {
    switch (cardId) {
      case 'card1': return allowedValuesCard1
      case 'card2': return allowedValuesCard2
      case 'card3': return allowedValuesCard3
      case 'card4': return allowedValuesCard4
      default: return allowedValuesCard1
    }
  }

  // Função para aumentar quantidade
  const increaseQuantity = (cardId: keyof typeof quantities) => {
    const allowedValues = getAllowedValues(cardId)
    const currentIndex = allowedValues.indexOf(quantities[cardId])
    if (currentIndex < allowedValues.length - 1) {
      setQuantities(prev => ({
        ...prev,
        [cardId]: allowedValues[currentIndex + 1]
      }))
    }
  }

  // Função para diminuir quantidade
  const decreaseQuantity = (cardId: keyof typeof quantities) => {
    const allowedValues = getAllowedValues(cardId)
    const currentIndex = allowedValues.indexOf(quantities[cardId])
    if (currentIndex > 0) {
      setQuantities(prev => ({
        ...prev,
        [cardId]: allowedValues[currentIndex - 1]
      }))
    }
  }

  // Função para calcular preço
  const calculatePrice = (quantity: number) => {
    return (quantity * priceMultiplier).toFixed(2)
  }

  // Função para redirecionar para checkout
  const redirectToCheckout = (cardId: keyof typeof quantities, quantity: number) => {
    if (cardId === 'card2' && checkoutUrls.card2[quantity as keyof typeof checkoutUrls.card2]) {
      window.location.href = checkoutUrls.card2[quantity as keyof typeof checkoutUrls.card2]
    } else if (cardId === 'card3' && checkoutUrls.card3[quantity as keyof typeof checkoutUrls.card3]) {
      window.location.href = checkoutUrls.card3[quantity as keyof typeof checkoutUrls.card3]
    } else {
      // Para cards sem checkout específico, usar alert temporário
      alert(`Redirecionando para checkout com quantidade: ${quantity} - Preço: R$ ${calculatePrice(quantity)}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/images/vivasorte-logo-new.png" alt="Viva Sorte +" className="h-12 w-auto" />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#sorteios" className="text-muted-foreground hover:text-foreground transition-colors">
                Sorteios
              </a>
              <a href="#resultados" className="text-muted-foreground hover:text-foreground transition-colors">
                Resultados
              </a>
              <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
                Como Funciona
              </a>
              <a href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </a>
            </nav>

            <div className="flex items-center space-x-4">{/* Botões removidos conforme solicitado */}</div>
          </div>
        </div>
      </header>

      <section className="py-8 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <video className="w-full max-w-4xl h-auto rounded-lg shadow-lg" autoPlay muted loop playsInline>
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VID-20250927-WA0013-uYWMkZWCs4vlhNajeQsNwrhrosOIek.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                🎉 Novo: Sorteios instantâneos disponíveis
              </Badge>

              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
                  Participe dos <span className="gradient-text">melhores</span> sorteios
                </h1>
              </div>

              <Card className="overflow-hidden border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <video className="w-full h-64 object-cover" autoPlay muted loop playsInline>
                    <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VID-20250926-WA0520-8D16vPacb7zlrYFBl5HtFJ71bf3KVP.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-8 h-8 p-0 bg-transparent"
                        onClick={() => decreaseQuantity('card1')}
                        disabled={quantities.card1 === getAllowedValues('card1')[0]}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-bold text-lg px-4">{quantities.card1}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-8 h-8 p-0 bg-transparent"
                        onClick={() => increaseQuantity('card1')}
                        disabled={quantities.card1 === getAllowedValues('card1')[getAllowedValues('card1').length - 1]}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Termina em</div>
                      <div className="font-bold text-red-500">1 dia</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                    onClick={() => redirectToCheckout('card1', quantities.card1)}
                  >
                    Participar Agora - R$ {calculatePrice(quantities.card1)}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="resultados" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Trophy className="w-8 h-8 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">Ganhadores do último sorteio</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Confira os ganhadores do sorteio da edição 003 de domingo, 21 de setembro de 2025
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold inline-flex items-center">
                  🍀 17090571
                </div>

                <div>
                  <h3 className="font-bold text-lg">Eliseto P. S.</h3>
                  <p className="text-muted-foreground text-sm">Feira de Santana - BA</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-bold text-green-700">R$ 1.000.000,00</p>
                  <p className="text-green-600 text-sm">Valor líquido</p>
                </div>
              </div>
            </Card>

            <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold inline-flex items-center">
                  🍀 10569968
                </div>

                <div>
                  <h3 className="font-bold text-lg">Aloísio V. P.</h3>
                  <p className="text-muted-foreground text-sm">Itapecerica da Serra - SP</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-bold text-green-700">R$ 50.000,00</p>
                  <p className="text-green-600 text-sm">Valor líquido - #SP</p>
                </div>
              </div>
            </Card>

            <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold inline-flex items-center">
                  🍀 1141726
                </div>

                <div>
                  <h3 className="font-bold text-lg">Irmão E.</h3>
                  <p className="text-muted-foreground text-sm">Uberlândia - MG</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-bold text-green-700">R$ 50.000,00</p>
                  <p className="text-green-600 text-sm">Valor - #MG</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
              Ver mais resultados
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Active Raffles Section */}
      <section id="sorteios" className="py-20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Sorteios Ativos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Participe agora dos sorteios mais emocionantes e concorra a prêmios incríveis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Roxo 500 MIL (primeiro card) */}
            <Card className="overflow-hidden border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img src="/images/card-purple-500mil.png" alt="Sorteio 500 MIL" className="w-full h-64 object-cover" />
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-8 h-8 p-0 bg-transparent"
                      onClick={() => decreaseQuantity('card2')}
                      disabled={quantities.card2 === getAllowedValues('card2')[0]}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-bold text-lg px-4">{quantities.card2}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-8 h-8 p-0 bg-transparent"
                      onClick={() => increaseQuantity('card2')}
                      disabled={quantities.card2 === getAllowedValues('card2')[getAllowedValues('card2').length - 1]}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Termina em</div>
                    <div className="font-bold text-red-500">2 dias</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                  onClick={() => redirectToCheckout('card2', quantities.card2)}
                >
                  Comprar - R$ {calculatePrice(quantities.card2)}
                </Button>
              </CardContent>
            </Card>

            {/* Card 2 - Azul 3 MIL (segundo card) */}
            <Card className="overflow-hidden border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img src="/images/card-blue-3mil.png" alt="Sorteio 3 MIL" className="w-full h-64 object-cover" />
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-8 h-8 p-0 bg-transparent"
                      onClick={() => decreaseQuantity('card3')}
                      disabled={quantities.card3 === getAllowedValues('card3')[0]}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-bold text-lg px-4">{quantities.card3}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-8 h-8 p-0 bg-transparent"
                      onClick={() => increaseQuantity('card3')}
                      disabled={quantities.card3 === getAllowedValues('card3')[getAllowedValues('card3').length - 1]}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Termina em</div>
                    <div className="font-bold text-red-500">15 horas</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                  onClick={() => redirectToCheckout('card3', quantities.card3)}
                >
                  Comprar - R$ {calculatePrice(quantities.card3)}
                </Button>
              </CardContent>
            </Card>

            {/* Card 3 - Amarelo 10 MIL (terceiro card - ESGOTADO) */}
            <Card className="overflow-hidden border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 opacity-75">
              <div className="relative">
                <img src="/images/card-yellow-10mil.png" alt="Sorteio 10 MIL" className="w-full h-64 object-cover grayscale" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <span className="text-white font-bold text-xl bg-red-600 px-4 py-2 rounded">ESGOTADO</span>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg px-4 text-gray-500">Indisponível</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Termina em</div>
                    <div className="font-bold text-red-500">3 horas</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold cursor-not-allowed"
                  disabled
                >
                  ESGOTADO
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Ver Todos os Sorteios
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Pronto para mudar sua sorte?</h2>
            <p className="text-xl text-muted-foreground">
              Junte-se a milhares de pessoas que já transformaram suas vidas com o VivaSort. Cadastre-se agora e
              participe do próximo sorteio!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Começar Agora - É Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Ver Sorteios Ativos
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-8">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Cadastro gratuito</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Sem taxas ocultas</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Suporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/images/vivasorte-logo-new.png" alt="Viva Sorte +" className="h-10 w-auto" />
              </div>
              <p className="text-muted-foreground">
                Transforme sua sorte em realidade com os melhores sorteios e prêmios incríveis.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Sorteios</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Ativos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Finalizados</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Próximos</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Conecte-se</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Viva Sorte +. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
