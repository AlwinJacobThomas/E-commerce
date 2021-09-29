var express = require('express');
const { compile } = require('morgan');
var router = express.Router();
var productHelper=require('../mongo-files/product-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products = [
    { index:1,
      title: 'Iphone 11',
      desc: 'This phone is a class phone',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSND-lxMpgi0f9MIHAtiJme1Ti0q1NsdanJtl8j2Ywik4LGZUDEK40mudKMbowR_yfwTA_HFK8i&usqp=CAc'
    },
    { index:2,
      title: 'samsung s10',
      desc: 'This phone is a class phone',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvZnFgbAr002oTdLxRzsIHRw55QlBiSRFYjfh7aUhTD0UscRZJ4FovQVjkrRcSknNNljdC42U&usqp=CAc'
    },
    { index:3,
      title: 'poco x2',
      desc: 'This phone is a class phone',
      img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXGBcXFxYXFRUVFxgYFxcXFxcYFhUZHSggGB0lGxUXITEhJSkrLi8uFx8zODMsNygtLisBCgoKDg0OGxAQGi0fHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tK//AABEIAOEA4AMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAgMHAQj/xABNEAABAwIEAgMJCwoFBAMBAAABAAIRAwQFEiExQVEiYXEGEzJzgZGhsbIHFCMzNFNys8HR8BUWJEJSgpKj0uE1Y5OiwiVDVGJEg/EX/8QAGwEAAQUBAQAAAAAAAAAAAAAAAAECAwQFBgf/xAA2EQABBAAEBAMFCAEFAAAAAAABAAIDEQQFITESQVFhcYGREyKh0fAGFDIzUrHB4SMVJEJysv/aAAwDAQACEQMRAD8A7ihCwfsUhNISe/vyXZWmB6Tz8igNqamHajeDqO3kq5iFtTGJ2lQMaKj6d0HPAAc4NZSDcztzE6Tsq7RZbudWqYe6mw0bW7pU3Mczv93Wcyc51z1GsczR7pLnEkaCTwWIbJi/873u1AcNNG25wA37Aaa6kmgFdFMFALq+GYjJyOIOsAzJB5FOFyTuMp2ra9D3oKYJtKRqd60B1bDqoaINTPmALjmjMutrpsnlkMbo5HF3DVE70b0PcV6EKvKBdhCXte9xgO5pgllKplcT2rYUS2mo9hGbULfXrZRPE7KNUeahAAWV/wDqjqP2IQvQKhGaeuFttauYa7hbKfgjsHqUSx8I9n3IQs7i4M5Wr2m2oCJOnHZarTw/OtmJYhToUzVqvDGDcmT5ABqT1BABJoIWVzXIOVu61vNRupMql0vdLsH1Jb35zZ8MUxlPYc0+hPGd2VhVBa24YHcnS079aeY3DQhJasVF+YArYluG31JzejUY7Xg5p5daZJhBG6VQ673McDMjktleuA2RudvvWyvGUzsoFtGYShCmW4MS47qOaj3khug8ynrXUeGiShCjUarg7K7VTVCt2Fzs524KahCh394KY5uOw+0pK6+e7XO70t9C34t8YZ5BVPGWk1WyNA0QN9S7Xq4NHn5BcVj8XNicY+EPLGtuqJG297b/AAVtjQ1t1atlribmuhxLh1gz5Dx32TxjgRI2KpeFVC6mCZ4gE7kAx+OxWvC/ix5fWrmR42Z0z8NIS6hYJ1OhAOvQ3z2TJmADiCmIQl2I3lWmW5KDqoIcXFpALYHREHeV1KrqHiOHkOztaCNeEls7+RLadswGWsaDwIaAfQE2OK1Z1tagEwDImS7K3QTpsSeA1XrMRraZrR8wJyuaQJ6zGy5zFfZ1kkhfFIWA7irHlqPQ2FO2ehRFrXhWGgHOWNbrMAAEnmf7p4ktfEa7S4C2LoJiHEZtXxBLY1DWn96FNsbl782emaZDiACZkcCDEeaVsYLBR4SP2bLPUnclRPcXGypqgWnhnyqevAFbTV6kGN4/a0TkqVWh41LBLiAds0eB2uhNMSrmnSe8btaSO2NPTC4c2kHjvh6TnkvLjqSXGZJWhgMEMSTxGgFQx+OGFA0sldGre6JasbABJA5tI/2Fx9CU/wD9FA+Lpa8yHOHpyKkPoSQANTsvO6Kn70osjWrUJAJ1DBpJA2J6QGvMrVly/BYdnFJZWW3NJpZGxsoOdsrce7K5cZZDOwNHocHetJ+6jEK1a3qGtULoyNGpgd9dlJA2BgbgDcqj4XjVbO5jySRrMAHsMaKzXlwallVcd81uP5k/ao3th+6maFtaHxCmiOKGLDJX2O2y04PhFNlNk02yQC5xaDLiJOp6ydOCd2+DWzmkFn8JdTH+wgqNZUjlbPIepObejAlWTDFwBvCK8AthjxxJLddz1IGabqlMcmuGv7xGb0qOyreUfibyq0DYS70l5d6lYa7TsoNVoE6SeCj+6Qlu3pY/ak0vs6KO3u0xOno6qyoBwLWuP8RyqbT91OsIFW2pmP2TUafLDXNHnSirePEbEDL0S1sEMdmAIjXUnzqsd1Aq16nfKZZR0ALKYLGSOOUTqePYqE2Ea3UAn0+QPxUjTa7l3Gd39tfuNIA0q4BPe3FjswG5Y9pIdHEaEck+q1sxk7cl82dy1V9K9tahPTbXZ0uOUkBwJEaEFw7CvqWFmSs4CnqIy7GgDerdTF5C9UaEsxS0Lum0ajQjq6lXqtm12jxJGk6tMdo1CtpuWAkF7ZESMwkTtI4bheVGMOrg08dY25rBx+Se3l9tC/gcd9N++mo78lMybhFEWq3Z2ZJDWDQaRwG2pPkVno0g0Bo4LEOY3QFo6pA9HkWbHg6gg7jQzqNwrOW5WMGC4u4nnc9ug/m902STj8FsQhC1VGk7MDAdPf60Zi/LngSewIbg2hDq9Z0tczV/BzMpO2+k9vlTheIQlVthBYWn3xWIaQcpdoQG5Q0iNuPamyEIQhCEIQl2PfEP8ntBcWsHfAU/Ft9S7T3QfJ6nYPaC4haO+ApeLb6lvZKNHeIXPZ4LLPrqpWHvAcXnsHaf7BQvdIeCLeDwqf8ABQbq4LYjmfRCWYneOqZc8w3NHaY+4K5msd4dz76fuqeAwh++MlvYH/yQoPc7bufWLeKu+KWxp2VRp/atz/M/sq73G3lKhXqPqN0ytaO2Jkz2K0d0OItr2tVzBoDbjhuKrj9qoxOd/pxbWmuvmtGR8hzVreH3eHfyUqkIDewepOre6mmG9e0JZY25IE8h6k2tLJuaC7zK88t4QDyWhGTeiK1o7bKSY2AJPOdO0JBcnXQz1q0YqwhrhPCl7A+0BJMQBD3EDXM8gxIJnkdDE+nsUUMzq+u3zRzVeuglN01Wm4GWpVlrS0Go4gsYeJDQHESAXFo0I3VbuGKMvLk9pS6wb+kUfGs9oL6jXzFaM+Ho+Np+0F9OrJxv5nkrANoUa9quYwuYzO7SGzEyQN4MbzPUpKFUSqs3dek54NS0rGo6NAJkNIEjpDoiddBoeteCjbloAsakNho6ABESNDm1jXj6VZkShCq77ejIabGo4ENIgEwS0uyukgCC0Dc6xoEywu7aMtJlvWpt6R6TYa3Vx1JPGPSE2XqEIQheHZCEsv8AECDkZvxP2BV23x6s6rE9EwRvIDvBJ4HcaRx7JmTJkqu2Nw81WtNdpbFMd5gZmwR0zrMGPSeqOFZmE+LfK8nQbAFwA3OnDz03NeI2Vzga0AK94ff5zldvwPP+6Yqs2xh7Y5/arMt7IMbJioD7U2Wmr6irUM7A12iEIQtxQpV3SH9Gqfu+21cSt/iKXi2+oLtfdV8lqfue21cStz8BS8W31BdBkezvEfssHORbmKOLTP5D6/8A89Khd1dp3ptKBu1582T70woXWR8nY7rPutpGtSpVaINTIXAhgLjDssGBroW68pV3Ng77uWjsfiFSwr3MxkfFo02L5XR0Ve7mKBq9+zb9H1FWA0cljXH+ZQ9sKJ3J2r2CrUqs733x3RYW5NBxDDqBJKa4oP0Ot9K3P8xUowW5a4OHX4q+2fjzGmnSh6ga+KtVu2KbSOQ9Sk2+WCeOixp0iaYAHAeoJlhFrAM6aSnPkAZZU7X0VEuHdDR4kcHDcDhqCDsInqSytZOcZDmunjnHHnKaX9NKwwpGMIbYPwH9JfaKHiVu/K8lsS4FxkdZA0O3THmCrNyxWG9bCSXJ3ScNBTMKV0W/D0fG0/aC+mF81UPjqXjafthfSqysb+YPBW2bIQhCqJ6X4leZBlb4R9ASCtXe5xgNdESXPI3Ov6p2H3dan4w6HuJnQA6CTEcAN+KqFrjpe94jK7MKbmtipkdrltw4dGpckSXAEtpjwpiXcNmMk2JxMrT+FmgGtXY1IG5q/UAbgK5GGtaO6tGH372z1GC0GRwOhIHA8lY6bw4AjY6qn2U9ORBzHSZjot48VZ8K+KHl9avZBipPbvw5Ntqx2227G/kmTNFBymoQlV7ihpuLRQqvgNgtaSDmnjwjTz+VdWqyjYhalji4Don0dqqdnbPFfWmAMrGl3eyPAymc+xnL7PXFxp4u8tc/3vVABAAIhx6eWcsTt0oE8tF4zFKZOlCoHQ4iWAFxa0uIGs7DzkLAfkgEj3QuAD+RF14aj0PqphMaAPJeYXaEkPcIA26/7J2kZx10E+9a2n/ryy+jU/wO6pk2GJmq8tNGoyATmcCAYdlgab8fPyWlgMDHg4vZs15k8yUx7y82UzQhCupiT91vySr2N9tq4hbH4Cl4seoLtndkYsq3Y322riFqfgKf0R6l0eRfhd4rHzRtuZ9dVDuCjD6zW1GucC5oPSAJaSOUhYXJWimdVvvFilEyP3U/qV2PeXMZkadmzmjTmtmJ/I630rf61QLUqdiXyOt9K3+tWZmDeHCuA5BMwrf90CuhYbUmm2d4EeYJtTpdDXc8vx1KsYNdSGNBkiJ6miCZVoFWAefBY8zS00ncJJKW3FuTI5JZcWxantS5A1jVRbuHDyp7Hu2KaC5p1CqeINVbuzCtOKECVVb92hCscloQpfQdNej42n7QX0wvmK1d+kUfGs9pfTqyMZ+PyV5ooIQha6pMGBJgwJiTwE8FUTlAxawNVvRcWuiJETHVOgPJUcdygpuHe3d6yywAA9Clu6nSJMtdUdBfW1e7WCNC26MvLnb3vOg1LwydRIy9KNzx4cF7QvLh1QMdQDBGYvLswiQCBA0dqdJ4eVZOLyoTPMkb+Bx30BB8Qa/eu26kbJWhFpZhmGOIgAAEzIblaBoAGiTwAVlpsDQANglIvLqPkwnn3xoG50iTPDWRO+il2Nas8nvlIUwJHhZi7RpDhGgGrhB10UuAy2PCcRB4nO3J/auQ9fFI+QuU9IvyNWgD35UkCJjfVx11/wDb/aOAhPULRTEldg9XKxrbqr0ZknpEz16Tr+1mQzCaoa4e+qhcY1dqBEagAhwMDg4Cdwdi5K1e+GTGYT2hIXAbmkJZa4VUa7M66qu2gaRwkEGQZA331JnVa6ODVpaXXdQgalrZAJ6PEuJjo7Enc8ynkr1KhCEIQhIu7c/oNbsb7bVxCzP6PT7Au193xiwr/RHtBcUsfk7OxdJkX4XeKzsc2y366qBcrTTOq3XKj010LwhrPdTa0Kn4l8jrfSt/rSl9kEzxhsWdXtt/rSszNNMM8dlBC2sQ1XHAqQpNhoEkDymJThl4x44yRMQRH45Ku4bXzVGAHgCfQm97cBpOWBOsxGp3lZcsZLh1Uwgv3l5UudzMR+NFB/K1PPkBzR4UcOqea0uqjcmAJMqsWdYuruy+Ccx9J/urEcDTdoMF78k3xhw3VVxDcpxiV2IInUbdoSEvLgmlpAUsLSAoFn8po+NZ7S+oV8w2rf0ij41ntBfTyxsb+Z5fNXAhCEKolQkzO59jYy1azY4NqZQekHagDXb0nmnK1OrNG7gO0gJCQNTohRrTDm03Zg5xORrCXGZDNidNT1qcsGOB1BlZpQbQhCFg/YpChIMSxAEmXBrAYEkAHtJS739S+dp/6jPvSjHbR5qtdkLm5WhpFIV8hbULqgNMkQXshofwyqe57u8hpzk9GWxUktDgSzORqcnRknXidZXnM0ZxRE0jrLj6dh4eSvj3dAnuE32oGYOYdAQZAPUU9C513LWlRryS3LLGtJ70KAqVA9xztoAnIA0tbPGF0ZdXkb3+zfE53EGkUT3G3ly7EaDZVpgLBQhCFuKFVv3QzGH1/oj1hcXw35O1dl90g/8ATrj6P2hccwVs24XR5Gfcd4qpiRYHkl1yFopjVTbqnqtVClqulOuqcB7qa4XSmFN7oPktX6Vt9aV7YU8olasXfNrWP+Zb/WrHzLWB57KpGLnBT20JY5pGjhr6FOq1s2v4lL7alxO8Dr0AUylSEGd1CQNCtCL/ACabUoWJDNSqMB1LSB1zuJ5ketIcKuWyCBBjKQnV6WideHHmkbWjM4ggehTxjQ0pnM5LReVi6oe3l1D+y0vYBqDotdWrL9N/wFqr1Yaq7ibVc3aKAmtQcNu/sbMjcEcN19ML5awqp8NRH+az2l9SrFzEgyiug/lTIQhCoIS3Fbst6DdCdzyCRMrNcC4GQC4E8ixxa6SeTmuHkUjukpPdna12UkCD1DcdUwRPCZVXs7GqadXK7LLqoiJL8t1WJE7iW5m9ffOpcNmQGKnkMsnDwODQDyHXz306a6aq5H7rRQVjw7EP12HQOe0jTXI9zDtwJaYKs9CqHAOHFc5wO1q5i4OyNzVARE5iLl5IjsDhPDPor/hXxQ8vrWlk5MGKfhmu4mVf/UggV6Hl252o5RbQ6lMQhC6dV0ov8PMlzBM7j7lA97P2yO9KYXeLFj3MFGo+OLQSD0Zgab69nXMga2Yy8tc821VobESN+qNwdeRHWNYwMV9ncNPIZAS29wKr+lM2dwFLdh1gWnM/fgOXWU0SqyxR9R+X3vUYOLnCBsD5RMjnpMRqmq1sJhIsLGI4hQ+JPUqNzi42UIQhWU1VX3TD/wBNuPo/auS9zbJokda6t7qjowy4+iuV9zLxDguiyb8iQ9x/ChmbbT5LXd0dV5aW+qZ3tIKH3wBbrXkt0UYJqgt9erDYUS7M2Vbxlv8AWBabqssqhmxr+Nt/rAqmYsrBv8E5kXDR7hWg1csGBsFLwu8YCTVkg8o8vrSu9eQwk65fuCTMvzpvM7KDha5tFLh3Eaqfjt6Do3QSf7KtXt24SPP96k3tw0u4jyqFdmezbgh7qFNV78QtRWVXB4J/AKn12TpHb9qh24BkHlATWk0ZCN5jVRVparO0S2xpRcUfGs9pfUC+bqVGKtIx/wB2l7bR9q+kViY/8zy+aUIQhCpJVDv7Tvg00cNvuKS1LV40LT5p9ITy9rmmwuDHP1Ayt1OpA0nluoZxV2p7w+AzNJBEuhxyxE/q79axsfkkGMf7QktdzIrXxH13UrJSwUotnhhP6uRsknSJJJJ05kkmesp6xoAgbBLLfFi94Z3mo2Y6TmuDdQDocupmR+6exNlawOXRYNpDLJO5O5TXvL90KFd2r3uYW1XU8syAAcwMaGdOHJTUK+mJT+T6/wD5T95kMZtmBjWRsCNuJ6gBuH1w2PfLiYHSLG7hrgTAjclp/d6ymy198ExInlKDohLW4dXkE3TyNJGRkHnwkeRScOt6lNpFSqap01LQ2IaAdB1gnyqahCEIQhCFT/da/wALuPon1FcXwy6ykrs3uuH/AKXcfRPqK4LQrQunyCuB4KexodYKsta9lR++pdTrSmFGzquaC1jiDoCBoSJ+4+YreIYwakDxKcIgFHqVFOB/Qa/jaHthQqtpUALiwgAAnbQO8Ekbjh5weKlUz+gV/G0PbCo5m5rsI/hN6JJW00eITzEQ4syjiPu/ukNUZQOvdWqpT49STVbUkukcVRDxSzYXgaFVyo7XyreaZdoOpbLizLXc2+pb6DToEy1fEuihMtyn9pbNEZto7FqDANxqpDCCk1NgKu91rZe02/Bxwq0u0zVZuu7Lgty74vxtH61i70sjMBUo8PmpIzohCEKinoQhCEIQhCEIQhYVNjG6QmkKt45i8SARk13cGiGglxc7gBH41hc5zg2SwfxCJ5T29SiYvTa4Br25mFtQObmyyCwgiZ00XmH4jTY1lGnSqQ0BjB3yi50NAG7qsnhrK8+xDn4kCZzeNxJJvYCzQGuldK7nUFXmgNNKx4JipccrueXUzDoBgHiIIVhVHw0kvqQCCap0Mb5aehg+pXhdPkk73sfG7UNIrnoRdXzrlqq8wAIKEIQttQqle6//AIXX7D7Ll8/Tqu/+7H/hdb8fquXAKo1XSZJ+W491LFzU22KbUcVqsDWtf0WzDTq3U5pLToTPFJ7Y6La5y6RzGvaA4WrICl1sTqODgXDpBod0WgnLAEkCZhrQTxgSptH5BX8bQ9sJGSndv8gr+Ooe21ZmZNa3CycIrRQ4ge6PEK4U6gLQo1VgWqg8wOxbolZgasGqKXXNGVH7wQCeKcVKM6LX3iCntCkEiXupklZNapVRi15U6k4OtR7o60/G0frGrvi4FcUYNOfnaX1rF31Y+Yj/AC+XzVuH8KEIQqClUHEbzIIHhH0Dmqk3ugpVKtemXuzUNarnNIptkB3xh6OxmOop5ivxh7BC5p3P0Khx2+zteaJpy3MHGmXZrfUT0Z0PpXE5hM7FTztkcQ2MaAHo4A6cyb8lbYOFrSOauXcp3YUbtrn2z3PYxwa4Oa5mpE6ZupXSm8OAI2K4x7kFs+nTvA9jmTcSA5pbIg6ieC69hXxQ8vrK1MtlMWNlwYJcxosWbrbn0N7KOQWwO5qahLvyxQgk1WiImZB1jLAOpBkRG8rL8rUPnWa9fp7OvrHNdEoEvxjCC45mZufRjMDxiQRr2JT7zf4OatPPM7N2xEehWU4rRguD5a2JIBIEkASQOseeV7+V7f55n8Q6x6wQsPE5HHK/iY8t51QI71e1+nZTNmIFEWoWD4UaZzOnedYkkwMzo0mANgniXsxi3O1VmwMTrBmNN+C9/KlGCQ/MG6ktBcN4/VGq08LhWYaPgZ4kncnqfrbRRucXGyp6EtZjNAnKH6k5dWuGuYNjUftFo/ebzCZKymqje7J/hdX8fquXBqzNQvon3ScNfcYdcU6YLn5S5oAJJjeANzBOi+fqAzNBh3bBI84XT5CWmN7Seimh5rGiFm4rZ3rqPmKwc08j5iui4mgbqxYWuU8t/kFfx1D22pIKZ5HzFN7Or8BVpHd2VzZ4vYQWjyws/Ht9ph3tbqaUM+rPMK2U7Z2RtSDlIEO4bLbTKoWGd19dlNtCpRqVGU+i009dGiBmb+1AAmeCnN7sR/4lz/AsJmNir3zR6arMlicdgro3q1WmoDxCq9Pu3y7Wt0Oxkfasn93M/wDxrv8Ah/v1lKcZB+sfH5KH7u/orC4c153iRI4aqsVO7GTJtbo9rFj+ePK1uf4Effof1BHsJOifYg93wQc2PhaMEjf4RvHjv6l3VfOmA4lcYjf2lu2i5jG1G1HZozBlOCZAAytgRJ3OUL6LWZi5RK/iHRXYmkDVCEIVVSJfidoXjM3wh6Qqrc4TLy41bhp16IqkNGaQYaRA0J27d9Va2YtbuEitTIhpkOBEOy5T2HO3+ILM39HWajNHZTLm6OktjtlrhHUVi43KBNIZon8DjvoCD5dVKyWhRFpDh2GuJMOeQYkucSBq46dfSjyDkrNTphoAGwWk3tIf9xg/eb9/Usqdyxxytc0neAQTAMHbr08is4DLWYS3XxOO5PbkByH1aa9/EoeIWQDHGlQpOqbgOY2CS4FxO3bvuFHFOrDotKLSWmDma6XakBwDRIk667kp4haKYkb3V8pb70pO4wKjQ1zhMaFuklrd9tPJj73qOkm1pNcCAJy1A5pc5rxpGXoQdf2ojcJ1UqBolxAHWo/5SpTGb0FQSYmGI1I8NPcgJQCdkodb1HZS6xoyBtnbvljfLDhDnNgjitzrm4aPkjYJBgPBgyBJAaZiJnhHUnTHgiQZHUs1MDYsJFAtLVhaxxoMY6Guy5Wy0iSBIG4zHzlT0ISoQk933NWdVxe+3plzvCcG5XHrLmwSnCEoJBsGkJB+Z9j8x/vq/wBSPzMsfmT/AKtb+tOK1w1nhED1+Za6d/TJjN5wR61G7MGsfwOlp3Qu1/dKGEi6So9xlj8yf9at/Wtb+4iwIg0XQdx36v8A1qxheqx7eX9R9Sm0Oiqzfc+w4GRb68++Vf6lt/Maw+Y/mVP6lZEJPbS/rPqlVc/Mew+Y/mVP6kfmPYfMfzKn9Ssawe8ASTASGaQf8j6lJQVf/Mew+Y/31P6kfmPYfMfzKn9SbnEqX7XoKkU6gcJaQQoYse2U1HLxHs6/5TiytwoWF4Lb2094ospl3hEDpOjbM46nylMUIUhJJspEIQhIhKLvDKbWE0qFIukQ0gNBBcM3ok9oBUW7tqr2j9Go6yajXQ8zmkRBaHHpPdBgdYKsCiVMQpgxm9BPpUUs8cQuRwb4mkoBOyT0cOcXsL7amACZjYCNNc/S4kS3fSB4Sc2thSp602Nb2CNzJ/HUOS2Ublr/AATPr8y3p7HteOJpsdQkOiF4V6sHiQQlKFXb+7zEuO3AQTp1Aak8UrGIjR2mQ5YOskkvGWOYLD/D16SLuhmGUzodYJB0PAyIMjf7UnpUD3wv0z6OLemHQ4Fpb32ZJDabTknQk8tPOYg3EF0k2riTd8vl47BX9tBsrPht1lcNeiTBHo24FWJVPD6EZWCTrxJJ34knfn5Vawuk+zcjjFIy7a12n8/PzVecagr1CELo1AhR7utkYXebt4KQoWKMmmeqD5lXxb3xwPez8QaSPGk5oBcAVVcev3UqFavBe5jHvgGC7K0mAYMeYqq+573TPu3VWOp12ZGtdNWqKsySIHwbY5qzd0FLNbV26dKm8azGrSNYVX9zvDBRqViA0ZmtHRLzsTvm7VwOHMTsFMXi32KPPl681cN8YpdNwe4OrDykfaE2SLB2TUnkD6U9XW5BI+TBNL9aJA8Bt8lWmAD9EIQhbKiQkGJ3Bc4jgNB9pKfqrYhSIL2xOjtOc8PKPWud+0cr2wMY3QOdR9Nv58lPABxWl9fEabXspl0OqZu9iWgvygF2RpOYwDOyn4fdOac06cesdn4+9FVw977+ndNc002UHMOZhlpc6T3t2YAOMdIkaBgH62jihrMcSY8v3nXyrlHH2PA+L8VA+DrOnLpqNd1Z3sFW4GV6tdJsNA5CFsXpjTYWehCEJUJTi9wZyDy/cqnieLOpwWsJaXOYCG5jLDlcYzCBMjrgnaJsmLsipPOI9SrdrfQaje/UGZalYQ8S7Wq90/GNjccFweMJkx0rpW8XAao2BWw2vsdlcZowVopeDYg6oM8ZSDpplPlEnr47K4WtbO0O5+viqXhNz3zvjszXdMtJb4JydGRqYkAGJO6t2GMim2eMnzmVoZG5zMZJE0U2gauwDpt6n0TJqLQeamoQlf5dt+NQDoh2oOxAcOHI7LrFWWd7h+c5mmDx6/uUD8mVJ8Edsj8cT51Kbj1uZ6egiTBjXbt4mdtCvXY9biCagAJIBIdBy5Z4cMw9PJY+JyPCTyGQgtJ34TV/A/2pWzOApbrGwDOkdXegdinpX+XrfWakQYMtcOMcvxB5FZUMct3kNbUBJ0Ah28xGy0cPho8PGI4hQCjLiTZTJCEKdIheEL1K7zGqNJ5Y4nMMswJjMHFsnryHzjmhC03uEkzkgg/qn8ahR6GCuB0aG9en2KU3uitozd8gb6tcPTGnLXksxjtvlD++Q0/rEOjaZmNo4+TdYsmQ4R7rogdAaH9eRUomcAptrbCmIHlPNSEpp4/bOJAqbTMteNgCTqNocNdt+RTOm8EAjYiR2Fa8cbY2hjBQGwUZN6lZoQhPSIUG+sRU1Bh3r7V5e4kykQ1wcSRIDRJ8JrNvpOA8q0tx+3Lc+c5ZIByu1jLJGm3Tbr1qHEYeOeMxyCwUrXFpsKC7CHz4DSefRTGyw7Kcz9TwHL71j+Xrb50anKDDomYiY616MaoTlz65Wu8F0EOEjWOUb8ws3D5HhYHh4txG3EbA8tFI6ZxFJmhLKOOW7yA2oCSQAIdMuMDgma2FEhCFCxDEadAA1DAcYGhOsE68tkIWy7thUEHQ8DySt+HVRtr2H71sb3R25DzmPQyz0SfCEgCPMvKndLbCemTE7Dk7KY58+xZmMynD4t3G+w7qDXr1UjJXN2Wdthhmah05bz2lNgErrY5Ra4tlxIc5pAaT4ADnHsg+VZ/lilEyYysfoJ0qGG7danweBhwjS2Ib7k6k+J+gmueXbpkkR8Jv/wBn1jEIVxNUpvhDtP1rVkPBZ5P+KEIQvGeCP3PWEsqfLKX0Xe25CEIVlQhCEIUO84eX2XoQhCwHHtb6mrGrsO13svQhCFGvfi6ni63spyEIQheoQhCFCrfGt+j/AMgsTs3y+pCEIS64+PodlX1sU61+Mf8Au+w1CEIWt2zfpUvbYmyEIQhR7n9X6X2OXqEIUOh4D/oM9gLK+383ttQhCFha/wDc7an1lZabnZ/ih7KEIQv/2Q=='
    },
    { index:4,
      title: 'poko m3',
      desc: 'This phone is a class phone',
      img: 'data:image/jpeg;base64,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'
    }
  ]
  res.render('admin/view-products',{products,admin:true});
});
router.get('/add-products',(req,res)=>{
  res.render('admin/add-products',{admin:true})
})
router.post('/add-products',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)

  productHelper.addProduct(req.body,(result)=>{
    res.render('admin/add-products')
  })
})
module.exports = router;
