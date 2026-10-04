<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Panfeast</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          :root {
            --bg-color: #0d1117;
            --card-bg: #161b22;
            --border-color: #30363d;
            --text-color: #c9d1d9;
            --heading-color: #f0f6fc;
            --link-color: #58a6ff;
            --accent-color: #238636;
            --muted-color: #8b949e;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 2.5rem 1.5rem;
            line-height: 1.6;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
          }
          .header {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border-color);
          }
          .header h1 {
            color: var(--heading-color);
            font-size: 1.85rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .badge {
            background-color: rgba(56, 139, 253, 0.15);
            color: var(--link-color);
            font-size: 0.85rem;
            font-weight: 600;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            border: 1px solid rgba(56, 139, 253, 0.3);
          }
          .desc {
            color: var(--muted-color);
            font-size: 0.95rem;
          }
          .desc a {
            color: var(--link-color);
            text-decoration: none;
          }
          .desc a:hover {
            text-decoration: underline;
          }
          .stats-bar {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
          }
          .stat-item {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 0.75rem 1.25rem;
          }
          .stat-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--muted-color);
          }
          .stat-value {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--heading-color);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            font-size: 0.9rem;
          }
          th {
            background-color: #21262d;
            color: var(--heading-color);
            text-align: left;
            padding: 0.85rem 1rem;
            font-weight: 600;
            border-bottom: 1px solid var(--border-color);
          }
          td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--border-color);
            word-break: break-all;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: rgba(110, 118, 129, 0.08);
          }
          a.url-link {
            color: var(--link-color);
            text-decoration: none;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 0.85rem;
          }
          a.url-link:hover {
            text-decoration: underline;
          }
          .nowrap {
            white-space: nowrap;
          }
          .priority-pill {
            display: inline-block;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            background-color: rgba(35, 134, 54, 0.2);
            color: #3fb950;
            border: 1px solid rgba(63, 185, 80, 0.3);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Panfeast XML Sitemap <span class="badge">Google / AdSense Ready</span></h1>
            <p class="desc">
              This is the official search engine sitemap for <a href="https://panfeast.com/">Panfeast (panfeast.com)</a>.
              It lists all indexable articles, categories, and site pages.
            </p>
          </div>

          <div class="stats-bar">
            <div class="stat-item">
              <div class="stat-label">Total URLs Indexed</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Format</div>
              <div class="stat-value">Sitemap 0.9 XML</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 50px;">#</th>
                <th>URL</th>
                <th style="width: 110px;">Priority</th>
                <th style="width: 200px;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td style="color: var(--muted-color);"><xsl:value-of select="position()"/></td>
                  <td>
                    <a class="url-link">
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="priority-pill">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority">
                          <xsl:value-of select="sitemap:priority"/>
                        </xsl:when>
                        <xsl:otherwise>0.8</xsl:otherwise>
                      </xsl:choose>
                    </span>
                  </td>
                  <td class="nowrap" style="color: var(--muted-color); font-size: 0.8rem;">
                    <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="substring(sitemap:lastmod, 12, 8)"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
