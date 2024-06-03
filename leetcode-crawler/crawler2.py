import os
import time
import requests
import base64
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urljoin

def get_problem_slugs(limit=5):
    url = "https://leetcode.com/graphql"
    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    }
    query = {
        "query": "\
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) { \
          problemsetQuestionList: questionList( \
            categorySlug: $categorySlug \
            limit: $limit \
            skip: $skip \
            filters: $filters \
          ) { \
            total: totalNum \
            questions: data { \
              titleSlug \
            } \
          } \
        }",
        "variables": {
            "categorySlug": "",
            "skip": 0,
            "limit": limit,
            "filters": {}
        }
    }
    response = requests.post(url, headers=headers, json=query)
    data = response.json()
    slugs = [q['titleSlug'] for q in data['data']['problemsetQuestionList']['questions']]
    return slugs

def save_html_content(page_source, slug, page_type):
    directory = f"html_contents/{page_type}/"
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_path = os.path.join(directory, f"{slug}.html")
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(page_source)

def download_resource(url, slug, resource_type):
    directory = f"resources/{slug}/{resource_type}/"
    if not os.path.exists(directory):
        os.makedirs(directory)
    resource_name = url.split("/")[-1]
    file_path = os.path.join(directory, resource_name)
    response = requests.get(url)
    print(response.content)
    with open(file_path, 'wb') as file:
        file.write(response.content)

def fetch_description_data(slug, driver):
    description_url = f"https://leetcode.com/problems/{slug}/description/"
    
    problem_data = {}
    problem_data['problem_slug'] = slug
    problem_data['problem_link'] = description_url
    
    # Fetch the problem description page
    driver.get(description_url)
    try:
        # Wait for the page to load completely
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(1)  # wait for the page to load

        # Save HTML content for description page
        save_html_content(driver.page_source, slug, "description")

        # Click the 'Topics' to expand the panel
        try:
            topics_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//span[text()='Topics']/ancestor::button"))
            )
            topics_button.click()
            time.sleep(1)  # wait for the panel to expand

            # Extract topics
            topic_div = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "div[class*='flex flex-wrap gap-1']"))
            )
            topics = [topic.text for topic in topic_div.find_elements(By.TAG_NAME, 'a')]
            problem_data['topics'] = topics
        except Exception as e:
            print(f"Error fetching topics for {slug}: {e}")
            problem_data['topics'] = []

    except Exception as e:
        print(f"Error fetching description data for {slug}: {e}")

    return problem_data

def get_file_content_chrome(driver, uri):
  result = driver.execute_async_script("""
    var uri = arguments[0];
    var callback = arguments[1];
    var toBase64 = function(buffer){for(var r,n=new Uint8Array(buffer),t=n.length,a=new Uint8Array(4*Math.ceil(t/3)),i=new Uint8Array(64),o=0,c=0;64>c;++c)i[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(c);for(c=0;t-t%3>c;c+=3,o+=4)r=n[c]<<16|n[c+1]<<8|n[c+2],a[o]=i[r>>18],a[o+1]=i[r>>12&63],a[o+2]=i[r>>6&63],a[o+3]=i[63&r];return t%3===1?(r=n[t-1],a[o]=i[r>>2],a[o+1]=i[r<<4&63],a[o+2]=61,a[o+3]=61):t%3===2&&(r=(n[t-2]<<8)+n[t-1],a[o]=i[r>>10],a[o+1]=i[r>>4&63],a[o+2]=i[r<<2&63],a[o+3]=61),new TextDecoder("ascii").decode(a)};
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(){ callback(toBase64(xhr.response)) };
    xhr.onerror = function(){ callback(xhr.status) };
    xhr.open('GET', uri);
    xhr.send();
    """, uri)
  if type(result) == int :
    raise Exception("Request failed with status %s" % result)
  return base64.b64decode(result)

def fetch_editorial_data(slug, driver):
    editorial_url = f"https://leetcode.com/problems/{slug}/editorial/"
    
    problem_data = {}
    problem_data['problem_slug'] = slug
    problem_data['editorial_link'] = editorial_url
    
    # Fetch the editorial page
    driver.get(editorial_url)
    try:
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(1)  # wait for the page to load
        
        # Save HTML content for editorial page
        save_html_content(driver.page_source, slug, "editorial")

        # Check for the presence of '.object-fit-contain' and download resources
        resource_elements = driver.find_elements(By.CLASS_NAME, 'object-fit-contain')
        if resource_elements:
            for elem in resource_elements:
                resource_url = elem.get_attribute('src') or elem.get_attribute('data-src')
                if resource_url:
                    print('resource url:', resource_url)
                    bytes = get_file_content_chrome(driver, resource_url)
                    with open('test.png', 'wb') as file:
                        file.write(bytes)
        problem_data['has_object_fit_contain'] = bool(resource_elements)

    except Exception as e:
        print(f"Error fetching editorial data for {slug}: {e}")
        # Save HTML content even if an error occurs
        save_html_content(driver.page_source, slug, "editorial")

    return problem_data

def main():
    options = Options()
    options.headless = False  # Set to False to handle CAPTCHA manually
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-popup-blocking")
    options.add_argument("--incognito")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    problem_slugs = get_problem_slugs(limit=5)  # Limiting to 5 problems
    description_data = []
    editorial_data = []

    for slug in problem_slugs:
        print(f"Fetching description data for {slug}...")
        description = fetch_description_data(slug, driver)
        description_data.append(description)
        
        print(f"Fetching editorial data for {slug}...")
        editorial = fetch_editorial_data(slug, driver)
        editorial_data.append(editorial)
    
    # Close the browser
    driver.quit()
    
    # Create DataFrames and save them to CSV files
    description_df = pd.DataFrame(description_data)
    description_df.to_csv('leetcode_problems_description.csv', index=False)
    
    editorial_df = pd.DataFrame(editorial_data)
    editorial_df.to_csv('leetcode_problems_editorial.csv', index=False)
    
    print("Data saved to leetcode_problems_description.csv and leetcode_problems_editorial.csv")

if __name__ == "__main__":
    main()
