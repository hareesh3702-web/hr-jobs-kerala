* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f7fa;
  color: #222;
}

header {
  background: #10375c;
  color: white;
  padding: 30px 20px;
  text-align: center;
}

header h1 {
  margin: 0 0 8px;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.filters input,
.filters select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 180px;
}

#search {
  flex: 1;
}

h2 {
  margin-top: 30px;
}

#search-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

#search-links a {
  background: white;
  border: 1px solid #d0d7de;
  padding: 10px 14px;
  border-radius: 6px;
  text-decoration: none;
  color: #10375c;
  font-weight: bold;
}

#search-links a:hover {
  background: #eaf2ff;
}

.job {
  background: white;
  border: 1px solid #d0d7de;
  border-left: 5px solid #1a73e8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 12px;
}

.job h3 {
  margin: 0 0 6px;
}

.job p {
  margin: 4px 0;
}

.badge {
  display: inline-block;
  background: #eef4ff;
  color: #10375c;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 12px;
  margin-right: 6px;
}

.apply {
  display: inline-block;
  margin-top: 8px;
  background: #1a73e8;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
}

.apply:hover {
  background: #155ab6;
}

footer {
  text-align: center;
  padding: 20px;
  color: #555;
  font-size: 14px;
}
