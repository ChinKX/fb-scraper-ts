const puppeteer = require('puppeteer')

const scrapeContents = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  })
  const page = await browser.newPage()
  //await preparePageForTests(page);

  await page.goto('https://www.facebook.com/login')

  // login page
  /**
   * Login to the Facebook
   */
  //await page.screenshot({path: '1.png'})

  await page.type('[name=email]', 'kxiang168@gmail.com')

  await page.type('[name=pass]', 'cykx#fb#0801')

  //await page.screenshot({path: '2.png'})

  await page.click('[type=submit]')

  // social page
  /*
  await page.waitFor(5000)

  await page.goto(`https://www.facebook.com/${username}`)
  */
  
  //await page.goto(`https://www.facebook.com/${username}`)

  await page.waitForSelector('div[class="_4299"]', {
    visible: true
  })

  await page.waitFor(5000)

  //await page.screenshot({path: '3.png'})

  // execute code in the DOM
  /**
   * Search for the post with most reactions
   */
  const data: number = await page.evaluate(() => {
    const mostReacted = Array.from(document.querySelectorAll('div[class="_78bu"]'))
      .map(e => {
        const element = e.getElementsByClassName('_81hb')[0]
        if (element !== null && element !== undefined) {
          const innerHTML = element.innerHTML
          if (innerHTML.includes('K')) {
            return parseFloat(innerHTML.slice(0, innerHTML.indexOf('K'))) * 1000 // parseFloat(innerHTML.slice(0, -1)) * 1000
          }
          return parseFloat(innerHTML)
        } else 
          return 0
      })
      .reduce((x, y) => x > y ? x : y)

    /**
     * Filter the array to get the HTMLElement of the most reacted post
     */
    const most: Element[] = Array.from(document.querySelectorAll('div[class="_78bu"]')).filter(e => {
      const element = e.getElementsByClassName('_81hb')[0]
      if(element !== null && element !== undefined) {
        const innerHTML = element.innerHTML
        if (innerHTML.includes('K')) {
          return parseFloat(innerHTML.slice(0, innerHTML.indexOf('K'))) * 1000 === mostReacted
        }
        return parseFloat(innerHTML) === mostReacted
      } else
        return false
    });

    /**
     * Like the most reacted post
     */
    
    (most[0].getElementsByClassName('_6a-y _3l2t  _18vj')[0] as HTMLElement).click();
    (most[0].getElementsByClassName('_666h  _18vj _18vk _42ft')[0] as HTMLElement).click();

    const mostLikedComment: Element = Array.from(document.querySelectorAll('div[class="_5pcr userContentWrapper"]')).filter(e =>{
      const element = e.getElementsByClassName(' _81hb')[0]
      if (element !== null && element !== undefined) {
        const innerHTML = element.innerHTML
        if (innerHTML.includes('K')) {
          return parseFloat(innerHTML.slice(0, innerHTML.indexOf('K'))) * 1000 === mostReacted
        }
        return parseFloat(innerHTML) === mostReacted
      } else {
        return false
      }
    })[0];
    
    (mostLikedComment.getElementsByClassName('notranslate _5rpu')[0] as HTMLElement).tabIndex = 0;
    (mostLikedComment.getElementsByClassName('notranslate _5rpu')[0] as HTMLElement).focus()

    //document.querySelectorAll('div[role="textbox"]')[0].getElementsByTagName('br')[0].innerHTML = "Bravo!!!"

    return mostReacted
  })

  console.log(data)

  /*
  await page.reload()

  await page.waitFor('div[class="_5rpb"]', {
    visible: true
  })

  await page.focus('div[class="_5rpb"]')
  await page.type('div[class="_5rpb"]' ,'Bravo!!!')
  */
  await page.keyboard.type('Bravo!!!')
  await page.keyboard.press('Enter')
  
  await page.focus('a[class="_5afe"]')
  await page.click('a[class="_5afe"]')
  await page.focus('a[class="_42ft _4jy0 _4jy4 _517h _51sy"]')
  await page.click('a[class="_42ft _4jy0 _4jy4 _517h _51sy"]')
  await page.waitFor('a[class="_42ft _42fu _4-s1 _2agf _4o_4 _p _42gx"]')
  await page.focus('a[class="_42ft _42fu _4-s1 _2agf _4o_4 _p _42gx"]')
  await page.click('a[class="_42ft _42fu _4-s1 _2agf _4o_4 _p _42gx"]')
  await page.waitFor('a[class="_54nc"]')
  await page.focus('a[class="_54nc')
  await page.click('a[class="_54nc"]')

  await browser.close()

  console.log(data)

  //return data;
}

scrapeContents()