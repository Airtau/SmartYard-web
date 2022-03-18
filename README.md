# SmartYard-web
web-расширения для приложений

Часть функционала приложения, которая требует лишь диалогов с пользователем и не требует каких-то платформозависимых операций, 
мы решили реализовывать в виде Web расширений.

Реализованы 2 вида контроллеров:
* **WebViewController** -  простой web-контроллер, который используется в NavigationStack
* **WebPopupController** - модальный контроллер в виде шторки, отображается поверх NavigationStack

## Для интеграции с нативной частью приложения мы добавили несколько JS-расширений для WebKit:

* **function bearerToken()** - возвращает bearer-token пользователя
(данное расширение подключается нативно к WebKit до загрузки HTML)

Следующие 3 расширения используют механизм **window.webkit.messageHandlers** и для удобства обёрнуты в функции, 
реализация которых содержится в /js/lanta.js
* **function postLoadingStarted()** - уведомляет нативное приложение о том, что началась загрузка динамического контента и 
надо скрыть страницу от пользователя под скелетон
* **function postLoadingFinished()** - уведомляет нативное приложение о том, что весь динамический контент завершил свою загрузку и
можно показать страницу пользователю
* **function postRefreshParent(timeout)** - уведомляет нативное приложение о том, что надо обновить активный веб-контроллер в NavigationStack через timeout секунд

# Пример нашей реализации
Исходный код HTML/CSS/JS нашей реализации web-контроллеров вы можете посмотреть в папке bonuses.

Расширение добавляется в главное меню приложения через методы API методы приложения **/ext/list** и **/ext/ext**
Порядковый номер пункта в главном меню задаётся в параметре **order**. 
Нативные пункты главного меню имеют номера 100, 200 и т.д.
Соответственно, если хочетеся добавить элемент меню между 200 и 300 позицией, то достаточно задать web-расширению order=250 

`> POST /api/ext/list

{
	"code": 200,
	"name": "OK",
	"message": "Хорошо",
	"data": [
		{
			"caption": "Бонусы",
			"icon": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAS\/SURBVHic7d1LixxVGMbxv86IYJKOY8gipBMiCAYvAYlGRATBRZBIJqJRBEHXosnCL+BH0LhyIYgQ8LbxEoOoS92Il4WYBCGRmTEuFGUuIWrSjoszQcXpOtVVp+pU9\/P84CWL7pzzVp2ne05X90yDmZmZmZmZmamYyt1AxBZgGvgzdyMV9IFbgF2E\/leydjNG9gNvA78Bq2u1AnwGHAOeAm4nBKMrtgIHgBeAD4Gf+af3K\/UtcBS4Jk+L3TcDvMP\/T9ywugB8DrwMPE17odgA3Ac8D7wBnBuh51Xga+CmFvos5arcDay5HvgYuLPmOBeBb4Avga\/W\/v0OuFxxvGngNmDfWt0F3Er9H51zhBDN1RxnYhxntEfRJNQnSc7cBLiH\/IuRqx5McP5quTp3A4RNnaoncjfQhQDcn7uBjO7N3UAXAtCP3H6xlS6aEet9WytdFOjCq4DVyO3TwG5g77\/qDuC6hvsa1SXge8Irjyv1BfB75P9lXYNxCMB6PU6RNxTDFvuPde5b5fikxHbKZU0De0qMV7f2MNoFp1TH14gupC\/1I6TueF3rp1Fd2ARaRg6AOAdAnAMgzgEQ5wCIcwDE1X0NuhOYJXwcahfhuv6GmmNasQvAAvAD8AHwLjDfdhPbgVcIn7TJ\/Z66eg2AtwgPwFYcApYbOhhX9VoCDhasWxJHCYnLfbCu9WsAHBm6ejUdwos\/DjVghGeCspvAPnAK2Fh2YMtqmfB2+fnYHct+vPlF4O46HVmrrgU2A+\/H7ljmGWAncJbu\/xqZ\/deA8MpgoehOZS4EzRJf\/HngUaBHCFWbFdP18UetHvAwcCbS1xRh7Wo7SfGmYw64IcVEFcU2RV0fv6oZwrkv6u1EionORCZ5JMUkNagGAOAwxb2dTjHJUmSSTSkmqUE5AD2Ke1uKDVDmZ1zsIHN\/rrDp\/ib6+P1uoDgHQJwDIC7FX9TIvRHKbayP388A4hwAcQ6AuDIBWG68C2vKYuwOZQLwaYJGLI+PUgxyM\/Ar+T\/pUrXqyt1\/1fqF+F9fKW0H4ZOnix04MAeguBaBNym5+CmuY8dOctPXypuef6KPz68CxDkA4hwAcQ6AOAdAnAMgzgEQ5wCIcwDEOQDiHABxDoA4B0CcAyDOARDnAIhzAMQ5AOIcAHEOgDgHQJwDIM4BEOcAiHMAxDkA4hwAcQ6AOAdAnAMgzgEQ5wCIcwDEOQDiHABxDoA4B0CcAyDOARDnAIhzAMQ5AOIcAHEOgDgHQJwDIM4BEOcAiHMAxDkA4hwAcQ6AOAdAnAMgzgEQlyIAse8W3pRgDlWbI7fX\/l7nFAH4KXL7AwnmULU\/cvv5VrqIOEnxV5meBmYanD\/3V8c2ZQswH5n7RIPzl\/Ys8ZM0BxwGeg3MP2kB6AGPEV\/8VeCZupOl+N7bHcA5YCrBWFbeZeBGYKHOICn2APPAawnGsdG8Ss3Fh3TffL0dOIV3\/G1ZAnYT34BHpboO8CPwODBINJ4N9xfwJAkWvwlHCCGIbV5c1WoAPFd6NTI5SHiKyn2yJq0WgYdGWIestgIvAZfIf+LGvQbA68C2kVagpFSbwGH6wCxwgPCSpQ9sbHjOcbdC2N2fJVzoeY8Eu30zMzMzMzMzs78BQGIm4CmLbRMAAAAASUVORK5CYII=",
			"order": 250,
			"extId": "10001"
		}
	]
}

> POST /api/ext/ext HTTP/1.1
| {
| 	"extId": "10001"
| }

{
	"code": 200,
	"name": "OK",
	"message": "Хорошо",
	"data": {
		"basePath": "https:\/\/dm.lanta.me\/app_static\/bonuses\/",
		"code": "<содержимое файла /bonuses/index.html>"
	}
}`


