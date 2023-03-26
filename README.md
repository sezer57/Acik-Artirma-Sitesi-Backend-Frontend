# Spring Boot + React + Redis + H2Database + Websocket / Açık Artırma Uygulamsı
Bu uygulama, bir Spring Boot back-end ve React front-end kullanarak Redis veritabanını ve H2 veritabanını kullanan bir uygulama örneğidir. Ayrıca açık artırmayı canlı takip edebilme için WebSocket ile bağlantı kurarak gerçek zamanlı ürün fiyatı son teklif veren kişiyi gösterir.



## Backend 
### Endpoints
__POST__ /users/login  --Redis ile Session Döndürür<br>
__POST__ /users/register   <br>
__GET__ /users/getproducts<br>
__POST__ /users/updateproducts<br>
__Websocket__: "wss://localhost:8080/ws"  

***__POST__ /users/login   & register***
```
 {
      username:"" , 
      password:""
 }
 ```
 
 ***__GET__ /users/getproducts***
 ```
 {
    "id":,
    "name":"",
    "img":"",
    "info":"",
    "lastoffer":,
    "totaloffer":,
    "lastOfferUser":"",
    "lasttime":""
 }
```


***__POST__ /users/login   & register***
```
 {
      username:"" , 
      password:""
 }
 ```
 
 ***__Websocket__ "wss://localhost:8080/ws/topic/product"***
 
 ```
{
  Eğer "__POST__ /users/updateproducts" ile fiyat güncelleme yapılırsa yeni fiyatı ,toplam teklifi ve yapanın ismini yayınlar
 }
  ```

## Frontend
Websitenin önyüzü React kullanılarak oluşturulmuştur. Ana sayfada kullanıcılar, ürünleri görüntüleyebilmek için giriş yapmaları gerekmektedir. Hesabı olmayan kullanıcılar, kayıt ol bölümünden hesap oluşturabilirler. Kullanıcı giriş yaptıktan sonra, Cookie ve kullanıcı adı local storage'da saklanır.
<br><br>
Ürünler bölümünde, öncelikle GET /users/getproducts endpointi kullanılarak ürünler alınır ve ardından canlı takip etmek için WebSocket bağlantısı kurulur. Fiyat değişikliği websocket ve useState kullanılarak sayfayı yenilemeden gerçekleştirilir. Ayrıca, ürün teklifi son tekliften düşük olamaz.
