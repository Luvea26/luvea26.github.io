
const WA="201019336292";
const products=[
 {id:"blossom",name:"Blossom Serenity Candle",price:350,img:"assets/hero-candle.jpg",cat:"Candles",desc:"A warm, elegant candle designed to bring calm and beauty into your space."},
 {id:"vanilla",name:"Vanilla Bloom Candle",price:320,img:"assets/candle-1.jpg",cat:"Candles",desc:"Soft vanilla-inspired warmth with a refined LUVEA mood."},
 {id:"lavender",name:"Lavender Dreams Candle",price:350,img:"assets/candle-2.jpg",cat:"Candles",desc:"A gentle floral mood for quiet evenings."},
 {id:"cinnamon",name:"Cinnamon Glow Candle",price:330,img:"assets/candle-3.jpg",cat:"Candles",desc:"A cozy statement candle with a warm character."},
 {id:"love",name:"Love Spell Candle",price:360,img:"assets/candle-4.jpg",cat:"Candles",desc:"A romantic candle made for gifting and special moments."}
];
let cart=JSON.parse(localStorage.getItem("luveaCart")||"[]");
function save(){localStorage.setItem("luveaCart",JSON.stringify(cart));renderCart()}
function add(id){let p=products.find(x=>x.id===id);let q=cart.find(x=>x.id===id);q?q.qty++:cart.push({...p,qty:1});save();openCart()}
function remove(id){cart=cart.filter(x=>x.id!==id);save()}
function change(id,d){let q=cart.find(x=>x.id===id);if(!q)return;q.qty+=d;if(q.qty<=0)remove(id);else save()}
function total(){return cart.reduce((s,x)=>s+x.price*x.qty,0)}
function orderWA(){
 let lines=cart.map(x=>`${x.name} × ${x.qty} = EGP ${x.price*x.qty}`);
 let msg=`Hello LUVEA, I'd like to order:\n${lines.join("\n")}\nTotal: EGP ${total()}\nPlease confirm availability and delivery details.`;
 window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
}
function renderCart(){
 const box=document.querySelector("#cartItems"), sum=document.querySelector("#cartTotal");
 if(!box)return;
 if(!cart.length){box.innerHTML='<div class="empty">Your cart is waiting for something beautiful.</div>'}
 else box.innerHTML=cart.map(x=>`<div class="cart-item"><img src="${x.img}"><div><strong>${x.name}</strong><div>EGP ${x.price} × ${x.qty}</div><div><button onclick="change('${x.id}',-1)">−</button> <button onclick="change('${x.id}',1)">+</button></div></div><button onclick="remove('${x.id}')">×</button></div>`).join("");
 sum.textContent=`EGP ${total()}`;
}
function openCart(){document.querySelector("#cart").classList.add("open");document.querySelector("#overlay").classList.add("open")}
function closeCart(){document.querySelector("#cart").classList.remove("open");document.querySelector("#overlay").classList.remove("open")}
document.addEventListener("DOMContentLoaded",renderCart);
